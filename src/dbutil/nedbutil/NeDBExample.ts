import { Criteria, CriteriaType } from './Criteria';

class NeDBExample {
    public static DESC: number = -1
    public static ASC: number = 1

    private allCriteriaList: Criteria[] = [];

    private sort: number = NeDBExample.ASC
    private field: any = null

    public createCriteria(): Criteria {
        const criteria = new Criteria();
        this.allCriteriaList.push(criteria);
        return criteria;
    }

    public or(): Criteria {
        return this.createCriteria();
    }

    public setSort(field: string, sort: number) {
        this.field = field
        this.sort = sort
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

    public getSort(): {field: string, sort: number} {
        return {field: this.field, sort: this.sort}
    }
}
export {NeDBExample};
