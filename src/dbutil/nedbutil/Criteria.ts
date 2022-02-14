interface CriteriaType {
    [propName: string]: any;
}
class Criteria {

    private andCriteriaList: CriteriaType[] = [];

    get criterias(): CriteriaType[] {
        return this.andCriteriaList;
    }

    public eq(field: string, value: any): Criteria {
        const criteriaParam: CriteriaType = {
            [field]: value,
        };

        this.andCriteriaList.push(criteriaParam);
        return this;
    }

    public ne(field: string, value: any): Criteria {
        const criteriaParam: CriteriaType =  {
            [field]: {$ne: value},
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    }

    public lt(field: string, value: any): Criteria {
        const criteriaParam: CriteriaType = {
            [field]: {$lt: value},
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    }

    public lte(field: string, value: any): Criteria {
        const criteriaParam: CriteriaType = {
            [field]: {$lte: value},
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    }

    public gt(field: string, value: any): Criteria {
        const criteriaParam: CriteriaType = {
            [field]: {$gt: value},
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    }

    public gte(field: string, value: any): Criteria {
        const criteriaParam: CriteriaType = {
            [field]: {$gte: value},
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    }

    public in(field: string, values: any[]): Criteria {
        const criteriaParam: CriteriaType = {
            [field]: {$in: values},
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    }

    public nin(field: string, values: any[]): Criteria {
        const criteriaParam: CriteriaType = {
            [field]: {$nin: values},
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    }
}

export {
    CriteriaType,
    Criteria,
};
