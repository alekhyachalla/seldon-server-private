import { PanelLayout, Widget } from "@lumino/widgets";

import { FileBrowser } from "@jupyterlab/filebrowser";

//import { S3Drive } from "./contents";

//import { IDocumentManager } from "@jupyterlab/docmanager";

import { h, VirtualDOM } from "@lumino/virtualdom";

// import { ServerConnection } from "@jupyterlab/services";

// import { URLExt } from "@jupyterlab/coreutils";

// import { showErrorMessage } from "@jupyterlab/apputils";


//import { requestAPI } from './seldon';


/**
 * Widget for authenticating against
 * an s3 object storage instance.
 */
let seldonForm: any;

/**
 * Widget for hosting the S3 filebrowser.
 */
export class SeldonModelDeploy extends Widget {
  constructor(browser: FileBrowser) {
    console.log("God is great but this time he's in browser ts after constructor");
  //constructor(browser: FileBrowser) {
    super();
    this.addClass("jp-Seldon");
    this.layout = new PanelLayout();

    /**
     * Function to handle setting credentials that are read
     * from the s3AuthenticationForm widget.
     */
    const seldonFormSubmit = () => {
      const form = document.querySelector("#seldonform") as HTMLFormElement;
      const formData = new FormData(form);
      const formDataJSON: any = {};
      (formData as any).forEach((value: string, key: string) => {
        formDataJSON[key] = value;
      });

      console.log("form data Json", formDataJSON );      
    }
      console.log("God is great but this time he's in browser ts");

//      requestAPI<any>('get_example')
//      .then(data => {
//        console.log(data);
//      })
//      .catch(reason => {
//        console.error(
//          `The seldon server extension appears to be missing.\n${reason}`
//        );
//      });







      // const settings = ServerConnection.makeSettings();
      // ServerConnection.makeRequest(
      //   URLExt.join(settings.baseUrl, "s3/auth"),
      //   {
      //     method: "POST",
      //     body: JSON.stringify(formDataJSON)
      //   },
      //   settings
      // ).then(response => {
      //   response.json().then(data => {
      //     if (data.success) {
      //       (this.layout as PanelLayout).removeWidget(s3AuthenticationForm);
      //       (this.layout as PanelLayout).addWidget(browser);
      //       browser.model.refresh();
      //     } else {
      //       let errorMessage = data.message;
      //       if (errorMessage.includes("InvalidAccessKeyId")) {
      //         errorMessage = "The access key ID you entered was invalid.";
      //       } else if (errorMessage.includes("SignatureDoesNotMatch")) {
      //         errorMessage = "The secret access key you entered was invalid";
      //       }
      //       void showErrorMessage(
      //         "S3 Authentication Error",
      //         Error(errorMessage)
      //       );
      //     }
      //   });
      // });
    //};
    seldonForm = new Widget({
      node: Private.createSeldonForm(seldonFormSubmit)
    });
    (this.layout as PanelLayout).addWidget(seldonForm);
    /**
     * Check if the user needs to authenticate.
     * Render the browser if they don't,
     * render the auth widget if they do.
    //  */
    // Private.checkIfAuthenicated().then(authenticated => {
    //   if (authenticated) {
    //     (this.layout as PanelLayout).addWidget(browser);
    //     browser.model.refresh();
      // } else {
      //   s3AuthenticationForm = new Widget({
      //     node: Private.createS3AuthenticationForm(s3AuthenticationFormSubmit)
      //   });
      //   (this.layout as PanelLayout).addWidget(s3AuthenticationForm);
      // }
    // });
  }
}

namespace Private {
  /**
   * Creates an s3AuthenticationForm widget
   * @param onSubmit A function to be called when the
   * submit button is clicked.
   */
  export function createSeldonForm(onSubmit: any): HTMLElement {
    return VirtualDOM.realize(
      h.div(
        { className: "seldonform" },
        h.h4("Seldon Browser"),
        h.div("This extension allows you to access Seldon Browser."),
        h.br(),
        h.form(
          { id: "seldonform", method: "post" },
          h.p(
            h.label({}, "Var 1"),
            h.br(),
            h.input({ type: "url", name: "endpoint_url" })
          ),
          h.br(),
          h.p(
            h.label({}, "Var 2"),
            h.br(),
            h.input({ type: "text", name: "client_id" })
          ),
          h.br(),
          h.p(
            h.label({}, "Var 3"),
            h.br(),
            h.input({ type: "password", name: "client_secret" })
          )
        ),
        h.br(),
        h.p(
          { className: "s3-connect" },
          h.button(
            {
              onclick: onSubmit,
              className: "jp-mod-accept jp-mod-styled"
            },
            "Connect"
          )
        )
      )
    );
  }

  /**
   * Returns true if the user is already authenticated
   * against an s3 object storage instance.
   */
  // export function checkIfAuthenicated(): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     const settings = ServerConnection.makeSettings();
  //     ServerConnection.makeRequest(
  //       URLExt.join(settings.baseUrl, "s3/auth"),
  //       {
  //         method: "GET"
  //       },
  //       settings
  //     ).then(response => {
  //       response.json().then(res => {
  //         resolve(res.authenticated);
  //       });
  //     });
  //   });
  // }
}

