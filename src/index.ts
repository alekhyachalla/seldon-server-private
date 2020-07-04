import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { IDocumentManager } from '@jupyterlab/docmanager';

import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

//import { S3Drive } from './contents';

import { SeldonModelDeploy } from './browser';

import { requestAPI } from './seldon';




/**
 * S3 filebrowser plugin state namespace.
 */
const NAMESPACE = 'seldon-modeldeploy';

/**
 * The ID for the plugin.
 */
const PLUGIN_ID = 'jupyterlab-seldon';

/**
 * The JupyterLab plugin for the S3 Filebrowser.
 */
const fileBrowserPlugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  requires: [
    IDocumentManager,
    IFileBrowserFactory,
    ILayoutRestorer,
    ISettingRegistry
  ],
  activate: activateFileBrowser,
  autoStart: true
};

/**
 * Activate the file browser.
 */
function activateFileBrowser(
  app: JupyterFrontEnd,
  manager: IDocumentManager,
  factory: IFileBrowserFactory,
  restorer: ILayoutRestorer,
  settingRegistry: ISettingRegistry
): void {
  // Add the S3 backend to the contents manager.
  //const drive = new S3Drive(app.docRegistry);
  // manager.services.contents.addDrive(drive);

  const browser = factory.createFileBrowser(NAMESPACE, {
    driveName: "Seldon",
    state: null,
    refreshInterval: 300000
  });





  requestAPI<any>('get_example')
  .then(data => {
    console.log(data);
  })
  .catch(reason => {
    console.error(
      `The seldon server extension appears to be missing.\n${reason}`
    );
  });






  //const seldonDeploy = new SeldonModelDeploy(browser, drive, manager);
  const seldonDeploy = new SeldonModelDeploy(browser);
  console.log("I'm running inside this actually main one");
  seldonDeploy.title.iconClass = 'jp-S3-icon jp-SideBar-tabIcon';
  seldonDeploy.title.caption = 'Seldon Browser';

  seldonDeploy.id = 'seldon-deploy';

  // Add the file browser widget to the application restorer.
  restorer.add(seldonDeploy, NAMESPACE);
  app.shell.add(seldonDeploy, 'left', { rank: 100 });

  return;
}

export default fileBrowserPlugin;

