import React, { PureComponent } from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import './Dictionary.scss';
import Word from './Word';
import { getToken, getUserId } from '../../services/postUserData';
import { getUserSettings } from '../../services/settingsService';

const filters = [
  '{"$and":[{"userWord.optional.deleted":false},{"userWord.optional.difficult":false}]}',
  '{"$and":[{"userWord.optional.deleted":false},{"userWord.optional.difficult":true}]}',
  '{"userWord.optional.deleted":true}',
];
const types = ['learning', 'difficult', 'deleted'];

export default class Dictionary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wordInfo: {},
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.setStateFromSettings();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  setStateFromSettings = async () => {
    const response = await getUserSettings(getToken(), getUserId());
    if (response.status === 200) {
      if (this.mounted) {
        const {
          optional: {
            explanationSentence,
            exampleSentence,
            wordTranscription,
            associationImage,
            showWordAndSentenceTranslation,
          },
        } = response;
        this.setState({
          isLoaded: true,
          wordInfo: {
            explanationSentence,
            exampleSentence,
            wordTranscription,
            associationImage,
            showWordAndSentenceTranslation,
          },
        });
      }
    }
  }

  render() {
    const { wordInfo, isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <div className="dictionary">
          <div className="container" />
        </div>
      );
    }
    return (
      <div className="dictionary">
        <div className="container">
          <Tabs>
            <TabList className="tab-list">
              <Tab className="tab learning-words">Изучаемые слова</Tab>
              <Tab className="tab complex-words">Сложные слова</Tab>
              <Tab className="tab deleted-words">Удаленные слова</Tab>
            </TabList>
            {filters.map((el, i) => (
              <TabPanel className="tab-panel" key={types[i]}>
                <Word filter={el} type={types[i]} wordInfo={wordInfo} />
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    );
  }
}
