export interface IJobProcess {
  id: number;
  data: string | null;
  department: string | undefined;
  digital_format_link: string | undefined;
  identifier: string | undefined;
  is_digital_format: boolean | undefined;
  is_external_client: boolean | undefined;
  is_internal_client: boolean | undefined;
  is_non_digital_format: boolean | undefined;
  name: string | undefined;
  responsible_authority: string | undefined;
  status: string | undefined;
}

export interface IJobServices {
  id: number;
  name: string | undefined;
  processes: string[] | undefined;
  regulating_act: string | undefined;
  service_type: string | undefined;
}

export interface IJob {
    name: string | undefined;
    subname?: string | undefined;
    identifier: number | 0;
    services?: IJobServices | undefined;
    id: string | undefined;
  }[];
  