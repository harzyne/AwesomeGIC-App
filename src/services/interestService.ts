import { InterestRule } from '../models/interestRule';

export class InterestService {
    private interestRules: InterestRule[] = [];

    public defineInterestRule(date: string, ruleId: string, rate: number): void {
        const existingRule = this.interestRules.find(rule => rule.date === date);
        if (existingRule) {
            existingRule.rate = rate; // Update rule if it already exists for the date
        } else {
            this.interestRules.push({ date, ruleId, rate });
        }
    }

    public getInterestRate(date: string): number {
        const rule = this.interestRules.filter(rule => rule.date <= date).pop();
        return rule ? rule.rate : 0;
    }

    public listInterestRules(): InterestRule[] {
        return this.interestRules.sort((a, b) => a.date.localeCompare(b.date));
    }
}
