import React, { PureComponent } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import '../Settings.scss';

export default class SettingsForm extends PureComponent {
  render() {
    const currentProps = this.props;
    const { settings } = currentProps;
    if (!settings.isDataLoaded) {
      return (
        <Spinner />
      );
    }
    return (
      <div className="settings">
        <div className="settings__wrapper">
          <h1>Настройки</h1>
          <div
            className={
              `settings__save-alert ${
                !settings.isDataSaved ? 'hidden' : ''
              }`
              }
          >
            Настройки успешно сохранены
          </div>
          <form action="" method="post">
            <div className="settings__form-group range-group">
              <h2 className="settings__form-group__title">Настройки приложения</h2>
              <div className="settings__input-group range-input-group">
                <label htmlFor="settings__words_per_day">Количество новых слов в день</label>
                <input
                  type="range"
                  name="settings__words_per_day"
                  id="settings__words_per_day"
                  min="0"
                  max="100"
                  step="1"
                  data-setting_name="wordsPerDay"
                  value={settings.wordsPerDay}
                  onChange={settings.setRange}
                />
                <div className="settings__green-line" style={{ width: `${(265 / 100) * settings.wordsPerDay}px` }} />
                <span className="settings__range_value" style={{ right: `${255 - (265 / 100) * settings.wordsPerDay}px` }}>{settings.wordsPerDay}</span>
              </div>
              <div className="settings__input-group range-input-group">
                <label htmlFor="settings__max_cards_per_day">Максимальное количество карточек на день</label>
                <input
                  type="range"
                  name="settings__max_cards_per_day"
                  id="settings__max_cards_per_day"
                  min="0"
                  max="100"
                  step="1"
                  data-setting_name="maxCardsPerDay"
                  value={settings.maxCardsPerDay}
                  onChange={settings.setRange}
                />
                <div className="settings__green-line" style={{ width: `${(265 / 100) * settings.maxCardsPerDay}px` }} />
                <span className="settings__range_value" style={{ right: `${255 - (265 / 100) * settings.maxCardsPerDay}px` }}>{settings.maxCardsPerDay}</span>
              </div>
            </div>
            <div className="settings__form-group">
              <h2 className="settings__form-group__title">Настройки карточки</h2>
              <div className="settings__checkbox-group">
                <div className="settings__checkbox-group__title">
                  Информация на карточке
                  <span>*</span>
                </div>
                <div className="settings__form-group">
                  <div className="settings__input-group checkbox-input-group">
                    <input
                      type="checkbox"
                      name="settings__word_translation"
                      id="settings__word_translation"
                      data-setting_name="wordTranslation"
                      checked={settings.cardInfo.wordTranslation}
                      onChange={settings.setCheckBoxGroup}
                    />
                    <label htmlFor="settings__word_translation">Перевод слова</label>
                  </div>
                  <div className="settings__input-group checkbox-input-group">
                    <input
                      type="checkbox"
                      name="settings__explanation_sentence"
                      id="settings__explanation_sentence"
                      data-setting_name="explanationSentence"
                      checked={settings.cardInfo.explanationSentence}
                      onChange={settings.setCheckBoxGroup}
                    />
                    <label htmlFor="settings__explanation_sentence">Предложение с объяснением значения</label>
                  </div>
                  <div className="settings__input-group checkbox-input-group">
                    <input
                      type="checkbox"
                      name="settings__example_sentence"
                      id="settings__example_sentence"
                      data-setting_name="exampleSentence"
                      checked={settings.cardInfo.exampleSentence}
                      onChange={settings.setCheckBoxGroup}
                    />
                    <label htmlFor="settings__example_sentence">Предложение с примером использования</label>
                  </div>
                  <div className="settings__input-group checkbox-input-group">
                    <input
                      type="checkbox"
                      name="settings__word_transcription"
                      id="settings__word_transcription"
                      data-setting_name="wordTranscription"
                      checked={settings.cardInfo.wordTranscription}
                      onChange={settings.setCheckBoxGroup}
                    />
                    <label htmlFor="settings__word_transcription">Транскрипция слова</label>
                  </div>
                  <div className="settings__input-group checkbox-input-group">
                    <input
                      type="checkbox"
                      name="settings__association_image"
                      id="settings__association_image"
                      data-setting_name="associationImage"
                      checked={settings.cardInfo.associationImage}
                      onChange={settings.setCheckBoxGroup}
                    />
                    <label htmlFor="settings__association_image">Картинка-ассоциация</label>
                  </div>
                  <div
                    className={
                      `settings__error ${
                        settings.isRequiredInputChecked ? 'hidden' : ''
                      }`
                      }
                  >
                    Необходимо выбрать хотя бы одну настройку карточки
                  </div>
                </div>
              </div>
            </div>
            <div className="settings__form-group">
              <div className="settings__input-group checkbox-input-group">
                <input
                  type="checkbox"
                  name="settings__auto_pronunciation"
                  id="settings__auto_pronunciation"
                  data-setting_name="autoPronunciation"
                  checked={settings.autoPronunciation}
                  onChange={settings.setCheckBox}
                />
                <label htmlFor="settings__auto_pronunciation">Автопроизношение</label>
              </div>
              <div className="settings__input-group checkbox-input-group">
                <input
                  type="checkbox"
                  name="settings__show_word_and_sentence_translation"
                  id="settings__show_word_and_sentence_translation"
                  data-setting_name="showWordAndSentenceTranslation"
                  checked={settings.showWordAndSentenceTranslation}
                  onChange={settings.setCheckBox}
                />
                <label htmlFor="settings__show_word_and_sentence_translation">Показывать перевод слова и предложений</label>
              </div>
              <div className="settings__input-group checkbox-input-group">
                <input
                  type="checkbox"
                  name="settings__display_show_answer_btn"
                  id="settings__display_show_answer_btn"
                  data-setting_name="displayShowAnswerBtn"
                  checked={settings.displayShowAnswerBtn}
                  onChange={settings.setCheckBox}
                />
                <label htmlFor="settings__display_show_answer_btn">Отображать кнопку “Показать ответ”</label>
              </div>
              <div className="settings__input-group checkbox-input-group">
                <input
                  type="checkbox"
                  name="settings__display_delete_btn"
                  id="settings__display_delete_btn"
                  data-setting_name="displayDeleteBtn"
                  checked={settings.displayDeleteBtn}
                  onChange={settings.setCheckBox}
                />
                <label htmlFor="settings__display_delete_btn">Отображать кнопку “Удалить”</label>
              </div>
              <div className="settings__input-group checkbox-input-group">
                <input
                  type="checkbox"
                  name="settings__display_difficult_btn"
                  id="settings__display_difficult_btn"
                  data-setting_name="displayDifficultBtn"
                  checked={settings.displayDifficultBtn}
                  onChange={settings.setCheckBox}
                />
                <label htmlFor="settings__display_difficult_btn">Отображать кнопку “Сложные”</label>
              </div>
              <div className="settings__input-group checkbox-input-group">
                <input
                  type="checkbox"
                  name="settings__display_assessment_btns"
                  id="settings__display_assessment_btns"
                  data-setting_name="displayAssessmentBtns"
                  checked={settings.displayAssessmentBtns}
                  onChange={settings.setCheckBox}
                />
                <label htmlFor="settings__display_assessment_btns">Отображать кнопки “Снова”, “Трудно”, “Хорошо”, “Легко”</label>
              </div>
            </div>
            <button
              type="button"
              className={
                `settings__btn ${
                  !settings.isRequiredInputChecked ? 'inactive' : ''
                }`
                }
              onClick={settings.saveSettings}
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
    );
  }
}
