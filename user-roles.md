## User Roles

### MSP Admin

* Full Access, no restrictions

### MSP Non-Admin

* Cannot create/edit/delete Schedules
* Cannot create/edit/delete Users
* Cannot create/edit/delete Cross Tenant Deployments
* _Can_ create/edit/delete Single-Tenant and Individual Deployments
  * NOTE: You can disable this in Settings->Preferences with the "Allow Non-Admin Users to Manage Deployments" setting
* _Can_ access terminal on all machines and edit scripts
  * NOTE: You can disable this in Settings->Preferences with the "Allow Non-Admins and Non-MSP Users to Use Terminal and Edit Scripts"
    * Disabling this prevents these users from being able to run arbitrary code on devices

### Customer (Tenant) Admin

* Can view/edit Computers, Schedules, Licenses and Deployments for their Tenant
* Can create users in their tenant
* Software they upload is owned by their tenant and are not visible to other tenants
* Licenses they create are owned by their tenant and are not visible to other tenants

### Customer (Tenant) Non-Admin

* Cannot create Schedules
* Cannot create Cross Tenant Deployments
* Cannot create Users
* Can create Deployments scoped to individual Computers and People

