import { AuthorizationError } from '../error/authorization-error';
import { ResourceNotFound } from '../error/resource-not-found';
import { GetResourceOwnerId, PermissionService } from './permission-service';

export class ApiResourcePermissionService implements PermissionService {
    private getResourceOnwerId: GetResourceOwnerId;
    private resourceNotFoundMsg: string;
    private authorizationErrorMsg: string;

    constructor(getResourceOwnerId: GetResourceOwnerId, resourceName = 'resource') {
        this.getResourceOnwerId = getResourceOwnerId;
        this.resourceNotFoundMsg = `The requested ${resourceName} does not exist.`;
        this.authorizationErrorMsg = `This user does not have access to this ${resourceName}.`;
    }

    public assertUserHasPermission = async (resourceId: string, userId: string): Promise<void> => {
        const ownerId = await this.getResourceOnwerId(resourceId);

        if (ownerId == null) {
            throw new ResourceNotFound(this.resourceNotFoundMsg);
        }

        if (ownerId !== userId) {
            throw new AuthorizationError(this.authorizationErrorMsg);
        }
    };
}
