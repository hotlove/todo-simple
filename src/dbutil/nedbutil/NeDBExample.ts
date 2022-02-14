import { Criteria, CriteriaType } from './Criteria';

class NeDBExample {

    private allCriteriaList: Criteria[] = [];

    public createCriteria(): Criteria {
        const criteria = new Criteria();
        this.allCriteriaList.push(criteria);
        return criteria;
    }

    public or(): Criteria {
        return this.createCriteria();
    }

    public getCriteria(): CriteriaType {
        const param: CriteriaType = {};

        if (this.allCriteriaList.length > 0) {
            if (this.allCriteriaList.length > 1) {
                // or 条件
                const orCriterias: CriteriaType[] = [];
                for (const criteria of this.allCriteriaList) {
                    const criterias = criteria.criterias;
                    if (criterias.length > 1) {
                        const andParam: CriteriaType = {
                            $and: criterias,
                        };
                        orCriterias.push(andParam);
                    } else {
                        orCriterias.push(criterias[0]);
                    }
                }
                return { $or: orCriterias};
            } else {
                // 非or
                const criteria = this.allCriteriaList[0];
                if (criteria.criterias.length > 1) {
                    return {
                        $and: criteria.criterias,
                    };
                } else {
                    return criteria.criterias[0];
                }
            }
        }
        return param;
    }
}
export {NeDBExample};
