import { AuthorizationError } from '../error/authorization-error';
import { ResourceNotFound } from '../error/resource-not-found';
import { GetResourceOwnerId, PermissionService } from '../permission-service';

export class TaskListPermissionService implements PermissionService {
    private getResourceOnwerId: GetResourceOwnerId;

    constructor(getResourceOwnerId: GetResourceOwnerId) {
        this.getResourceOnwerId = getResourceOwnerId;
    }

    public assertUserHasPermission = async (taskListId: string, userId: string): Promise<void> => {
        const ownerId = await this.getResourceOnwerId(taskListId);

        if (ownerId == null) {
            throw new ResourceNotFound('The requested task list does not exist');
        }

        if (ownerId !== userId) {
            throw new AuthorizationError('This user does not have access to this task list.');
        }
    };
}
