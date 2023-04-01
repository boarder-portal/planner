import ScheduleHttpClient from 'client/utilities/HttpClient/ScheduleHttpClient';

import { AddActionTagRequest, AddActionTagResponse } from 'server/api/actionTags/add';
import { EditActionTagRequest, EditActionTagResponse } from 'server/api/actionTags/edit';

class ActionTagsHttpClient extends ScheduleHttpClient {
  getBaseUrl(): string {
    return `${super.getBaseUrl()}/schedule/actionTags`;
  }

  async add(request: AddActionTagRequest, signal?: AbortSignal): Promise<AddActionTagResponse> {
    return this.post('/add', request, signal);
  }

  async edit(request: EditActionTagRequest, signal?: AbortSignal): Promise<EditActionTagResponse> {
    return this.post('/edit', request, signal);
  }

  async delete(request: { id: string }, signal?: AbortSignal): Promise<void> {
    return this.post('/delete', request, signal);
  }
}

export default new ActionTagsHttpClient();
