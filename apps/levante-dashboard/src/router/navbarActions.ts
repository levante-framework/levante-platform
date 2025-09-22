import { isLevante } from '../helpers';

// Define an interface for the action options
interface NavbarAction {
  title: string;
  icon?: string; // Optional icon
  buttonLink: { name: string; params?: Record<string, any> }; // Define buttonLink structure
  requiresSuperAdmin: boolean;
  requiresAdmin?: boolean; // Optional requiresAdmin
  project: 'ALL' | 'LEVANTE' | 'ROAR'; // Use literal types for project
  category: string;
}

const navbarActionOptions: Readonly<NavbarAction>[] = [
  {
    title: 'Back to Dashboard',
    icon: 'pi pi-arrow-left',
    buttonLink: { name: 'Home' },
    requiresSuperAdmin: false,
    requiresAdmin: false,
    project: 'ALL',
    category: 'Home',
  },
  {
    title: 'Groups',
    buttonLink: { name: 'ListGroups' },
    requiresSuperAdmin: false,
    requiresAdmin: true,
    project: 'ALL',
    category: 'Groups',
  },
  {
    title: 'View Assignments',
    icon: 'pi pi-list',
    buttonLink: { name: 'Home' },
    requiresSuperAdmin: false,
    requiresAdmin: true,
    project: 'ALL',
    category: 'Assignments',
  },
  {
    title: 'Create Assignment',
    icon: 'pi pi-sliders-h',
    buttonLink: { name: 'CreateAssignment' },
    requiresSuperAdmin: true,
    requiresAdmin: true,
    project: 'ALL',
    category: 'Assignments',
  },
  {
    title: 'Manage Tasks',
    icon: 'pi pi-pencil',
    buttonLink: { name: 'ManageTasksVariants' },
    requiresSuperAdmin: true,
    project: 'ALL',
    category: 'Assignments',
  },
  // TO DO: REMOVE USER "ACTIONS" AFTER NAMING 3 IS COMPLETE
  {
    title: 'Add Users',
    icon: 'pi pi-user-plus',
    buttonLink: { name: 'Add Users' },
    requiresSuperAdmin: true,
    requiresAdmin: true,
    project: 'LEVANTE',
    category: 'Users',
  },
  {
    title: 'Link Users',
    icon: 'pi pi-link',
    buttonLink: { name: 'Link Users' },
    requiresSuperAdmin: true,
    requiresAdmin: true,
    project: 'LEVANTE',
    category: 'Users',
  },
  // {
  //   title: 'Edit Users',
  //   icon: 'pi pi-pencil',
  //   buttonLink: { name: 'Edit Users' },
  //   requiresSuperAdmin: true,
  //   requiresAdmin: true,
  //   project: 'LEVANTE',
  //   category: 'Users',
  // },

  {
    title: 'Register administrator',
    icon: 'pi pi-user-plus',
    buttonLink: { name: 'CreateAdministrator' },
    requiresSuperAdmin: true,
    project: 'ALL',
    category: 'Users',
  },
] as const; 

interface GetNavbarActionsParams {
  isSuperAdmin?: boolean;
  isAdmin?: boolean;
}

export const getNavbarActions = ({
  isSuperAdmin = false,
  isAdmin = false,
}: GetNavbarActionsParams): Readonly<NavbarAction>[] => {

  return navbarActionOptions.filter((action) => {
      // If the action requires admin and the user is an admin, or if the action
      // requires super admin and the user is a super admin,
      // or if the action does not require admin or super admin,
      // the action will be in the dropdown
      if (
        (action.requiresAdmin && isAdmin) ||
        (action.requiresSuperAdmin && isSuperAdmin) ||
        (!action.requiresAdmin && !action.requiresSuperAdmin)
      ) {
        return true;
      } else {
        return false;
      }
    });
};
