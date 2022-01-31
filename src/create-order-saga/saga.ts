import { Logger } from '@nestjs/common';

interface SagaStep<T> {
  run: (params: T) => Promise<void>;
  compensate?: (params: T) => Promise<void>;
}

export class Saga<T> {
  private readonly logger = new Logger(Saga.name);
  private name = 'Unknown';
  private currentStep = 0;
  private params: T = {} as T;
  private steps: SagaStep<T>[] = [];

  constructor(name: string, params: T) {
    this.name = name;
    this.params = params;
  }

  public step(stepFn: (params: T) => Promise<void>): Saga<T> {
    const newStep = {
      run: stepFn,
    };
    this.steps.push(newStep);

    return this;
  }

  public withCommpensate(compensateFn: (params: T) => Promise<void>): Saga<T> {
    const lastStep = this.steps[this.steps.length - 1];
    if (!lastStep) {
      throw new Error('Must call step() before calling withCompensate()');
    }
    if (lastStep.compensate) {
      throw new Error('One step cant have 2 compensate functions');
    }

    this.steps[this.steps.length - 1].compensate = compensateFn;

    return this;
  }

  public async start(): Promise<void> {
    if (!this.steps.length) {
      this.logger.debug(`Saga "${this.name}" empty`);
    }

    for (let i = 0; i < this.steps.length; i += 1) {
      const step = this.steps[i];
      this.currentStep = i + 1;

      try {
        await step.run(this.params);
      } catch (error) {
        this.logger.error(error);
        this.runCompensate();
        return;
      }
    }
  }

  public getParam(key: string): any {
    return this.params[key];
  }

  public setParam(key: string, value: any): void {
    this.params[key] = value;
  }

  private async runCompensate(): Promise<void> {
    for (let i = this.currentStep; i > 0; i -= 1) {
      const step = this.steps[i - 1];
      if (step.compensate) {
        await step.compensate(this.params);
      }
    }
  }
}
