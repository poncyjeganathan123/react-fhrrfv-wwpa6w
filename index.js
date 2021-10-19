import { render } from 'react-dom';
import { Dialog } from '@syncfusion/ej2-popups';
import './index.css';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
  TreeGridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Filter,
  Sort,
  Inject,
} from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';
export class FilterMenu extends SampleBase {
  constructor() {
    super(...arguments);

    window.className = '';
  }
  // dialogObj = new Dialog({
  //   header: 'Dialog with Grid',
  //   animationSettings: { effect: 'None' },
  //   showCloseIcon: true,
  //   visible: false,
  //   isModal: true,
  //   width: '500px',
  //   buttons: [
  //     {
  //       click: dlgButtonClick,
  //       buttonModel: { content: 'Ok', isPrimary: true },
  //     },
  //   ],
  // });
  dlgButtonClick() {
    this.dialogInstance.hide();
  }

  complete(args) {
    if (args.requestType == 'filterafteropen') {
      const grid = this.getGrid();
      window.columnName = args.columnName;

      var columnuid = this.treegridInstance.getColumnByField(columnName).uid;
      var dialogObj = document.getElementById(columnuid + '-flmdlg')
        .ej2_instances[0];
      var dlgobj = document.getElementById(columnuid + '-flmenu');

      dialogObj.contentEle.innerHTML = "<div id='Grid'></div>"; //Create new div element for dialog content element

      dialogObj.show();
      document.getElementById('Grid').append(grid); // append your custom div element into the created div element
      document.getElementById('Grid').append(dlgobj); // append your custom div element into the created div element
      document.getElementById('Ascending').addEventListener('click', () => {
        var treegridInstance =
          document.getElementsByClassName('e-treegrid')[0].ej2_instances[0];
        treegridInstance.sortByColumn(window.columnName, 'Ascending', false); // sort column using sortByColumn method
      });

      document.getElementById('Descending').addEventListener('click', () => {
        var treegridInstance =
          document.getElementsByClassName('e-treegrid')[0].ej2_instances[0];
        treegridInstance.sortByColumn(window.columnName, 'Descending', false);
      });

      document.getElementById('Close').addEventListener('click', () => {
        var dialogObj = document.getElementById(columnuid + '-flmdlg')
          .ej2_instances[0];
        dialogObj.hide(); // close the dialog using hide method.
      });
    }
  }
  buttons = [
    {
      click: this.dlgButtonClick,
      buttonModel: { content: 'Ok', isPrimary: true },
    },
  ];

  getGrid() {
    var div = document.createElement('div');
    // div.id = 'Grid';
    var ascendingspan = document.createElement('span');
    var text = document.createElement('p');
    text.innerHTML = 'Sort By';
    text.style.display = 'inline-block';
    text.style.paddingRight = '5px';
    var imageascending = document.createElement('img');
    imageascending.type = 'image/x-icon';
    imageascending.rel = 'e-excel-ascending';
    imageascending.src = 'ascending.jpg';
    imageascending.style.height = '15px';
    imageascending.style.width = '15px';

    ascendingspan.id = 'Ascending';
    ascendingspan.appendChild(imageascending);
    ascendingspan.style.paddingRight = '5px';
    var imagedescending = document.createElement('img');
    imagedescending.src = 'descending.jpg';
    imagedescending.style.height = '15px';
    imagedescending.style.width = '15px';
    var descendingspan = document.createElement('span');
    descendingspan.appendChild(imagedescending);
    descendingspan.id = 'Descending';
    descendingspan.style.paddingRight = '115px';
    var closeIcon = document.createElement('span');
    closeIcon.id = 'Close';
    var close = document.createElement('img');
    close.style.height = '15px';
    close.style.width = '15px';

    close.src = 'close.jpg';
    closeIcon.appendChild(close);

    div.appendChild(text);
    div.appendChild(ascendingspan);
    div.appendChild(descendingspan);
    div.appendChild(closeIcon);
    return div;
  }

  render() {
    this.complete = this.complete.bind(this);

    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="col-md-9">
            {/* <DialogComponent
              id="defaultdialog"
              showCloseIcon={true}
              visible={false}
              width={'500px'}
              isModal={true}
              ref={(dialog) => (this.dialogInstance = dialog)}
              // target={'#targetElement'}
              header="About SYNCFUSION Succinctly Series"
              buttons={this.buttons}
              animationSettings={{ effect: 'None' }}
            ></DialogComponent> */}
            <TreeGridComponent
              dataSource={sampleData}
              ref={(treegrid) => (this.treegridInstance = treegrid)}
              actionComplete={this.complete}
              treeColumnIndex={1}
              childMapping="subtasks"
              height="350"
              allowSorting="true"
              allowPaging="true"
              allowFiltering="true"
              filterSettings={{ type: 'Menu', hierarchyMode: 'Parent' }}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="taskID"
                  headerText="Task ID"
                  width="90"
                  textAlign="Right"
                ></ColumnDirective>
                <ColumnDirective
                  field="taskName"
                  headerText="Task Name"
                  width="180"
                ></ColumnDirective>
                <ColumnDirective
                  field="startDate"
                  headerText="Start Date"
                  width="90"
                  format="yMd"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="duration"
                  headerText="Duration"
                  width="90"
                  textAlign="Right"
                />
              </ColumnsDirective>
              <Inject services={[Filter, Page, Sort]} />
            </TreeGridComponent>
          </div>
        </div>
      </div>
    );
  }
}

render(<FilterMenu />, document.getElementById('sample'));
