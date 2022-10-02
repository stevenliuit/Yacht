// Base
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

// Templates
import Templates from "../views/Templates.vue";
import TemplatesShow from "../components/templates/TemplatesDetails.vue";
import TemplatesForm from "../components/templates/TemplatesForm.vue";
import TemplatesList from "../components/templates/TemplatesList.vue";

// Apps
import Applications from "../views/Applications.vue";
import AppContent from "../components/applications/ApplicationDetailsComponents/AppContent.vue";
import AppProcesses from "../components/applications/ApplicationDetailsComponents/AppProcesses.vue";
import AppLogs from "../components/applications/ApplicationDetailsComponents/AppLogs.vue";
import AppStats from "../components/applications/ApplicationDetailsComponents/AppStats.vue";
import ApplicationDetails from "../components/applications/ApplicationDetails.vue";
import ApplicationsList from "../components/applications/ApplicationsList.vue";
import ApplicationsForm from "../components/applications/ApplicationsForm.vue";
import ApplicationDeployFromTemplate from "../components/applications/ApplicationDeployFromTemplate.vue";

// Project
import Project from "../views/Project.vue";
import ProjectList from "../components/compose/ProjectList.vue";
import ProjectDetails from "../components/compose/ProjectDetails.vue";
import ProjectEditor from "../components/compose/ProjectEditor.vue";

// Resources
import Resources from "../views/Resources.vue";
// Images
import ImageList from "../components/resources/images/ImageList.vue";
import ImageDetails from "../components/resources/images/ImageDetails.vue";
// Volumes
import VolumeList from "../components/resources/volumes/VolumeList.vue";
import VolumeDetails from "../components/resources/volumes/VolumeDetails.vue";
// Networks
import NetworkList from "../components/resources/networks/NetworkList.vue";
import NetworkDetails from "../components/resources/networks/NetworkDetails.vue";
import NetworkForm from "../components/resources/networks/NetworkForm.vue";

// User Settings
import UserSettings from "../views/UserSettings.vue";
import ChangePasswordForm from "../components/userSettings/ChangePasswordForm.vue";
import UserInfo from "../components/userSettings/UserInfo.vue";

// Server Settings
// import ServerSettingsNav from "../components/serverSettings/ServerSettingsNav.vue"
import ServerSettings from "../views/ServerSettings.vue";
import ServerInfo from "../components/serverSettings/ServerInfo.vue";
import ServerVariables from "../components/serverSettings/ServerVariables.vue";
import Prune from "../components/serverSettings/Prune.vue";
import ServerUpdate from "../components/serverSettings/ServerUpdate.vue";
import Theme from "../components/serverSettings/Theme.vue";
// import { component } from "vue/types/umd";
// import { component } from "vue/types/umd";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/templates",
    // name: "Templates",
    component: Templates,
    children: [
      {
        path: "",
        name: "查看模板",
        component: TemplatesList // perhaps rename to TemplatesIndex
      },
      {
        path: "new",
        name: "新模板",
        component: TemplatesForm // perhaps rename to TemplatesCreate
      },
      {
        path: ":templateId",
        name: "模板详细",
        component: TemplatesShow // perhaps rename to TemplateDetails
      }
    ]
  },
  {
    path: "/apps",
    component: Applications,
    children: [
      {
        name: "部署",
        path: "deploy/:appId",
        component: ApplicationsForm
      },
      {
        name: "编辑",
        path: "edit/:appName",
        component: ApplicationsForm
      },
      {
        name: "从模板部署",
        path: "templates",
        component: ApplicationDeployFromTemplate
      },
      {
        name: "查看应用",
        path: "/",
        component: ApplicationsList
      },
      {
        name: "添加应用",
        path: "deploy",
        component: ApplicationsForm
      },
      {
        path: ":appName",
        component: ApplicationDetails,
        children: [
          {
            name: "进程",
            path: "top",
            component: AppProcesses
          },
          {
            name: "信息",
            path: "info",
            component: AppContent
          },
          {
            name: "日志",
            path: "logs",
            component: AppLogs
          },
          {
            name: "状态",
            path: "stats",
            component: AppStats
          }
        ]
      }
    ]
  },
  {
    path: "/projects",
    component: Project,
    children: [
      {
        name: "查看项目",
        path: "/",
        component: ProjectList
      },
      {
        name: "编辑项目",
        path: ":projectName/edit",
        component: ProjectEditor
      },
      {
        name: "项目详细信息",
        path: ":projectName",
        component: ProjectDetails
      }
    ]
  },
  {
    path: "/user",
    component: UserSettings,
    children: [
      {
        name: "用户信息",
        path: "info",
        component: UserInfo
      },
      {
        name: "修改密码",
        path: "changePassword",
        component: ChangePasswordForm
      }
    ]
  },
  {
    path: "/settings",
    component: ServerSettings,
    children: [
      {
        name: "服务信息",
        path: "info",
        component: ServerInfo
      },
      {
        name: "主题",
        path: "theme",
        component: Theme
      },
      {
        name: "模板变量",
        path: "templateVariables",
        component: ServerVariables
      },
      {
        name: "Prune",
        path: "prune",
        component: Prune
      },
      {
        name: "更新 Yacht",
        path: "update",
        component: ServerUpdate
      }
    ]
  },
  {
    path: "/resources",
    component: Resources,
    children: [
      {
        name: "Images",
        path: "images",
        component: ImageList
      },
      {
        path: "images/:imageid",
        name: "Image 详细",
        component: ImageDetails
      },
      {
        name: "Volumes",
        path: "volumes",
        component: VolumeList
      },
      {
        path: "volumes/:volumeName",
        name: "Volume Details",
        component: VolumeDetails
      },
      {
        name: "网络",
        path: "networks",
        component: NetworkList
      },
      {
        path: "networks/new",
        name: "新 Network",
        component: NetworkForm
      },
      {
        path: "networks/:networkid",
        name: "Network 详细",
        component: NetworkDetails
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: "",
  routes
});

export default router;
