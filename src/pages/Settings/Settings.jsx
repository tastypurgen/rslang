import React, { PureComponent } from 'react';
import { getUserSettings, setUserSettings } from '../../services/settingsService';
import SettingsForm from './SettingsForm/SettingsForm';

export default class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      isDataSaved: false,
      token: localStorage.getItem('userToken'),
      userId: localStorage.getItem('userId'),
    };
  }

  componentDidMount() {
    this.loadUserSettings();
  }

  setRange(event) {
    this.setState({
      [event.target.dataset.setting_name]: +event.target.value,
      isDataSaved: false,
    });
  }

  setCheckBox(event) {
    this.setState({
      [event.target.dataset.setting_name]: event.target.checked,
      isDataSaved: false,
    });
  }

  async setCheckBoxGroup(event) {
    const settingName = event.target.dataset.setting_name;
    const isChecked = event.target.checked;
    await this.setState((prevState) => ({
      cardInfo: {
        ...prevState.cardInfo,
        [settingName]: isChecked,
        isDataSaved: false,
      },
    }));
    this.isRequiredInputChecked();
  }

  setStateFromObj(response) {
    this.setState({
      isDataLoaded: true,
      wordsPerDay: response.wordsPerDay,
      maxCardsPerDay: response.optional.maxCardsPerDay,
      cardInfo: {
        wordTranslation: response.optional.wordTranslation,
        explanationSentence: response.optional.explanationSentence,
        exampleSentence: response.optional.exampleSentence,
        wordTranscription: response.optional.wordTranscription,
        associationImage: response.optional.associationImage,
      },
      autoPronunciation: response.optional.autoPronunciation,
      showWordAndSentenceTranslation: response.optional.showWordAndSentenceTranslation,
      displayShowAnswerBtn: response.optional.displayShowAnswerBtn,
      displayDeleteBtn: response.optional.displayDeleteBtn,
      displayDifficultBtn: response.optional.displayDifficultBtn,
      displayAssessmentBtns: response.optional.displayAssessmentBtns,
      isRequiredInputChecked: response.optional.isRequiredInputChecked,
      setRange: this.setRange.bind(this),
      setCheckBox: this.setCheckBox.bind(this),
      setCheckBoxGroup: this.setCheckBoxGroup.bind(this),
      saveSettings: this.saveSettings.bind(this),
    });
  }

  async loadUserSettings() {
    const curState = this.state;
    const response = await getUserSettings(curState.token, curState.userId);
    if (response.status === 200) {
      this.setStateFromObj(response);
    }
  }

  isRequiredInputChecked() {
    const settings = this.state;
    const { cardInfo } = settings;
    this.setState({ isRequiredInputChecked: Object.values(cardInfo).includes(true) });
  }

  async saveSettings() {
    const curState = this.state;
    const settingsObj = {
      wordsPerDay: curState.wordsPerDay,
      optional: {
        associationImage: curState.cardInfo.associationImage,
        autoPronunciation: curState.autoPronunciation,
        displayAssessmentBtns: curState.displayAssessmentBtns,
        displayDeleteBtn: curState.displayDeleteBtn,
        displayDifficultBtn: curState.displayDifficultBtn,
        displayShowAnswerBtn: curState.displayShowAnswerBtn,
        exampleSentence: curState.cardInfo.exampleSentence,
        explanationSentence: curState.cardInfo.explanationSentence,
        isRequiredInputChecked: curState.isRequiredInputChecked,
        maxCardsPerDay: curState.maxCardsPerDay,
        showWordAndSentenceTranslation: curState.showWordAndSentenceTranslation,
        wordTranscription: curState.cardInfo.wordTranscription,
        wordTranslation: curState.cardInfo.wordTranslation,
      },
    };
    const response = await setUserSettings(curState.token, curState.userId, settingsObj);
    if (response.status === 200) {
      this.setState({ isDataSaved: true });
    }
    return response;
  }

  render() {
    const settings = this.state;
    return (
      <>
        {settings.isDataLoaded ? (
          <SettingsForm
            settings={settings}
            isDataLoaded={settings.isDataLoaded}
            isDataSaved={settings.isDataSaved}
            setRange={settings.setRange}
            setCheckBox={settings.setCheckBox}
            setCheckBoxGroup={settings.setCheckBoxGroup}
            saveSettings={settings.saveSettings}
          />
        ) : <div style={{ 'min-height': '84vh' }} />}
      </>
    );
  }
}
