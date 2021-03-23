import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface PropertySettingValue {
    name: string;
    value?: string;
    visible: boolean;
    requiredRegEx: boolean;
    regExRule?: string;
}
