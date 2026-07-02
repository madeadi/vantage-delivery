import type {
  DataProvider,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetOneResult,
  CreateParams,
  CreateResult,
  Identifier,
  RaRecord,
  QueryFunctionContext,
} from 'react-admin';

const API_URL = '/api';

interface Delivery extends RaRecord {
  id: Identifier;
  type: 'from_kitchen' | 'to_kitchen';
  phase: string;
  isPhaseDone: boolean;
  name: string;
  status: string;
  failureReason: string;
  updatedAt: string;
  createdAt: string;
  startAt: string;
  endAt: string;
}

const httpClient = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || response.statusText);
  }

  return response;
};

export const dataProvider: DataProvider = {
  getList: async <RecordType extends RaRecord = Delivery>(
    resource: string,
    _params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult<RecordType>> => {
    if (resource !== 'deliveries') {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const response = await httpClient(`${API_URL}/${resource}`);
    const data = (await response.json()) as RecordType[];
    return { data, total: data.length };
  },

  getOne: async <RecordType extends RaRecord = Delivery>(
    resource: string,
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ): Promise<GetOneResult<RecordType>> => {
    if (resource !== 'deliveries') {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const response = await httpClient(`${API_URL}/${resource}/${params.id}`);
    const data = (await response.json()) as RecordType;
    return { data };
  },

  getMany: async () => {
    throw new Error('Unsupported');
  },

  getManyReference: async () => {
    throw new Error('Unsupported');
  },

  create: async <
    RecordType extends Omit<RaRecord, 'id'> = Omit<Delivery, 'id'>,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  >(
    resource: string,
    params: CreateParams<RecordType>,
  ): Promise<CreateResult<ResultRecordType>> => {
    if (resource !== 'deliveries') {
      throw new Error(`Unsupported resource: ${resource}`);
    }
    const response = await httpClient(`${API_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify({ type: params.data.type }),
    });
    const data = (await response.json()) as ResultRecordType;
    return { data };
  },

  update: async () => {
    throw new Error('Unsupported');
  },

  updateMany: async () => {
    throw new Error('Unsupported');
  },

  delete: async () => {
    throw new Error('Unsupported');
  },

  deleteMany: async () => {
    throw new Error('Unsupported');
  },
};
