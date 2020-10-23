export interface PermissionService {
    assertUserHasPermission(resourceId: string, userId: string): Promise<void>;
}

export interface GetResourceOwnerId {
    (resourceId: string): Promise<string | undefined>;
}
