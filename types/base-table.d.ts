import { OcFormComponent } from './component'

export declare class BaseTable extends OcFormComponent {
  loading: boolean

  column: object[]

  data: []

  pagination: object

  height: string

  maxHeight: string

  layout: string

  pager: boolean
}
