import React, { PureComponent } from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import './Dictionary.scss';

export default class Dictionary extends PureComponent {
  render() {
    return (
      <div className="dictionary">
        <div className="container">
          <Tabs>
            <TabList className="tab-list">
              <Tab className="tab learning-words">Изучаемые слова</Tab>
              <Tab className="tab complex-words">Сложные слова</Tab>
              <Tab className="tab deleted-words">Удаленные слова</Tab>
            </TabList>
            <TabPanel className="tab-panel">
              <h3>Список изучаемых слов</h3>
            </TabPanel>
            <TabPanel className="tab-panel">
              <h3>Список сложных слов</h3>
            </TabPanel>
            <TabPanel className="tab-panel">
              <h3>Список удаленных слов</h3>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
