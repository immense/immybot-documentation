# Role-Based Access Control (RBAC) System

ImmyBot's RBAC system provides granular permission management, allowing you to control exactly what users can access and modify within your environment. This system has been designed with a phased approach to ensure seamless migration from legacy permissions while introducing powerful new capabilities.

## Development Roadmap

Our RBAC implementation follows a structured 5-goal approach, ensuring stability and backward compatibility throughout the transition.

### ✅ Goal 1: Build & Migrate to RBAC (Complete)

**Objective**: Seamlessly transition from legacy permissions to RBAC without breaking changes or requiring user reconfiguration.

**Status**: Complete - Implemented and released over the past 8 months

**Achievement**: Full feature parity with existing permission system while laying the foundation for advanced RBAC capabilities.

---

### Goal 2: Expose RBAC Interface

**Objective**: Provide a clear, intuitive UI for managing users and understanding current permissions.

**Key Features**:
- User management (create, remove, assign roles)
- Role assignment with expiration dates
- Built-in role visibility and permission details
- Comprehensive user and role overview screens

#### Built-In Roles

The system includes four primary access levels that mirror existing permission structures:

| Role | Access Level | Description |
|------|-------------|-------------|
| **MSP Administrator** | Full System | Complete administrative access across all tenants |
| **MSP User** | Restricted System | Broad access with specific limitations |
| **Tenant Administrator** | Full Tenant | Complete access within assigned tenant(s) |
| **Tenant User** | Restricted Tenant | Limited access within assigned tenant(s) |

*Additional built-in roles maintain compatibility with existing application preferences and toggles.*

#### Interface Screenshots

**User Management View**
- Overview of all users and their assigned roles
- Quick access to user modification and role assignment

![alt text](image-1.png)


**Role Overview**
- Summary of all roles and user assignment counts
- Easy identification of role distribution

![alt text](image-2.png)

**Permission Details**
- Detailed breakdown of permissions for each role
- Clear understanding of what each role can access

![alt text](image-3.png)

---

### Goal 3: Role Assignments with Tenant Scoping

**Objective**: Enable flexible role assignment across different tenant scopes.

Role assignments define where a user's permissions apply. Users can have multiple assignments with different scopes, providing precise access control.

#### Available Scopes

##### 🏢 Owner Scope
- **Coverage**: All tenants in the instance
- **Use Case**: System-wide administration
- **Requirement**: Cross-tenant role assignment permission

##### 🏬 MSP Scope
- **Coverage**: All tenants within selected MSP (including MSP tenant itself)
- **Use Case**: MSP-level management
- **Requirements**:
  - Cross-tenant role assignment permission
  - MSP tenant selection via dropdown

##### 🏷️ Tag Scope
- **Coverage**: All tenants with specified tag
- **Use Case**: Group-based management
- **Requirements**:
  - Cross-tenant role assignment permission
  - Tag selection via dropdown

##### 🎯 Specific Tenant Scope
- **Coverage**: Individual selected tenant
- **Use Case**: Single tenant administration
- **Requirement**: Cross-tenant role assignment permission

##### 👤 User's Tenant Scope
- **Coverage**: Current user's tenant only
- **Use Case**: Self-service tenant management
- **Requirement**: Basic user management permission

---

### Goal 4: Resource Scoping

**Objective**: Provide granular control over specific resources within assigned tenants.

Resource scopes define exactly which resources a role can access, starting with computer resources.

#### Computer Resource Scopes

##### Individual Computer
- **Target**: Specific selected computer
- **Use Case**: Technician assigned to particular machines

##### Tag-Based
- **Target**: All computers with specified tag
- **Use Case**: Department or function-based access (e.g., "HR-Computers")

##### Computer Type
- **Target**: Computers matching specified type criteria
- **Available Types**:
  - All computers
  - Workstations and Portable Devices
  - Servers
  - Domain Controllers

---

### Goal 5: Custom Roles

**Objective**: Enable creation of tailored roles with specific permission combinations.

**Status**: Near completion - will be released alongside other goals

Custom roles provide the ultimate flexibility in permission management, allowing you to:
- Create roles with precisely the permissions you need
- Combine permissions in ways that match your organizational structure
- Reduce over-privileging by granting only necessary access

## Benefits of the New RBAC System

### Enhanced Security
- **Principle of Least Privilege**: Grant only necessary permissions
- **Granular Control**: Fine-tune access at tenant and resource levels
- **Audit Trail**: Clear visibility into who has access to what

### Operational Efficiency
- **Flexible Assignment**: Multiple role assignments per user
- **Scope-Based Management**: Organize access by business structure
- **Automated Expiration**: Time-limited access for temporary users

### Scalability
- **Multi-Tenant Ready**: Built for MSP environments
- **Tag-Based Organization**: Logical grouping of resources
- **Custom Role Creation**: Adapt to changing business needs


## Migration Path

The RBAC system has been designed for seamless transition:

1. **Zero Disruption**: Existing permissions continue working unchanged
2. **Gradual Adoption**: Enable new features as needed
3. **Backward Compatibility**: Legacy configurations remain functional
4. **Training-Free Transition**: Familiar interface with enhanced capabilities

## Next Steps

As we complete the final goals, users will gain access to:
- Complete resource scoping across all ImmyBot resources
- Full custom role creation capabilities
- Advanced permission combinations
- Enhanced reporting and audit features

*Stay tuned for updates as we finalize these powerful new capabilities.*