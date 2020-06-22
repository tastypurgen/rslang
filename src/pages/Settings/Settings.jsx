import React, { PureComponent } from 'react';
import getUserSettings from '../../services/settingsService';
import SettingsForm from './SettingsForm/SettingsForm';

export default class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
    };
  }

  componentDidMount() {
    this.loadUserSettings();
  }

  setRange(event) {
    this.setState({ [event.target.dataset.setting_name]: +event.target.value });
  }

  setCheckBox(event) {
    this.setState({ [event.target.dataset.setting_name]: event.target.checked });
  }

  async setCheckBoxGroup(event) {
    const settingName = event.target.dataset.setting_name;
    const isChecked = event.target.checked;
    await this.setState((prevState) => ({
      cardInfo: {
        ...prevState.cardInfo,
        [settingName]: isChecked,
      },
    }));
    this.isRequiredInputChecked();
  }

  loadUserSettings = async () => {
    const response = await getUserSettings();
    if (response.status === 200) {
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
  };

  isRequiredInputChecked() {
    const settings = this.state;
    const { cardInfo } = settings;
    this.setState({ isRequiredInputChecked: Object.values(cardInfo).includes(true) });
  }

  async saveSettings() {
    console.log(this.state);
  }

  render() {
    const settings = this.state;
    return (
      <SettingsForm
        settings={settings}
      />
    );
  }
}
