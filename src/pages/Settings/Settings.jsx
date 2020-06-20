/* eslint-disable react/no-unused-state */
/* eslint-disable react/self-closing-comp */
import React, { PureComponent } from 'react';
import './Settings.scss';

export default class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wordsPerDay: 50,
      maxCardsPerDay: 40,
      cardInfo: {
        wordTranslation: true,
        explanationSentence: false,
        exampleSentence: false,
        wordTranscription: false,
        associationImage: false,
      },
      autoPronunciation: false,
      showWordAndSentenceTranslation: false,
      displayShowAnswerBtn: false,
      displayDeleteBtn: false,
      displayDifficultBtn: false,
      displayAssessmentBtns: false,
    };
  }

  render() {
    return (
      <div>
        <h1>Настройки</h1>
        <form action="" method="post">
          <div className="settings__form-group">
            <h2 className="settings__form-group__title">Настройки приложения</h2>
            <div className="settings__input-group">
              <label htmlFor="settings__words_per_day">Количество новых слов в день</label>
              <input type="range" name="settings__words_per_day" id="settings__words_per_day" />
            </div>
            <div className="settings__input-group">
              <label htmlFor="settings__max_cards_per_day">Максимальное количество карточек на день</label>
              <input type="range" name="settings__max_cards_per_day" id="settings__max_cards_per_day" />
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
                <div className="settings__input-group">
                  <input type="checkbox" name="settings__word_translation" id="settings__word_translation" />
                  <label htmlFor="settings__word_translation">Перевод слова</label>
                </div>
                <div className="settings__input-group">
                  <input type="checkbox" name="settings__explanation_sentence" id="settings__explanation_sentence" />
                  <label htmlFor="settings__explanation_sentence">Предложение с объяснением значения</label>
                </div>
                <div className="settings__input-group">
                  <input type="checkbox" name="settings__example_sentence" id="settings__example_sentence" />
                  <label htmlFor="settings__example_sentence">Предложение с примером использования</label>
                </div>
                <div className="settings__input-group">
                  <input type="checkbox" name="settings__word_transcription" id="settings__word_transcription" />
                  <label htmlFor="settings__word_transcription">Транскрипция слова</label>
                </div>
                <div className="settings__input-group">
                  <input type="checkbox" name="settings__association_image" id="settings__association_image" />
                  <label htmlFor="settings__association_image">Картинка-ассоциация</label>
                </div>
              </div>
            </div>
          </div>
          <div className="settings__form-group">
            <div className="settings__input-group">
              <input type="checkbox" name="settings__auto_pronunciation" id="settings__auto_pronunciation" />
              <label htmlFor="settings__auto_pronunciation">Автопроизношение</label>
            </div>
            <div className="settings__input-group">
              <input type="checkbox" name="settings__show_word_and_sentence_translation" id="settings__show_word_and_sentence_translation" />
              <label htmlFor="settings__show_word_and_sentence_translation">Показывать перевод слова и предложений</label>
            </div>
            <div className="settings__input-group">
              <input type="checkbox" name="settings__display_show_answer_btn" id="settings__display_show_answer_btn" />
              <label htmlFor="settings__display_show_answer_btn">Отображать кнопку “Показать ответ”</label>
            </div>
            <div className="settings__input-group">
              <input type="checkbox" name="settings__display_delete_btn" id="settings__display_delete_btn" />
              <label htmlFor="settings__display_delete_btn">Отображать кнопку “Удалить”</label>
            </div>
            <div className="settings__input-group">
              <input type="checkbox" name="settings__display_difficult_btn" id="settings__display_difficult_btn" />
              <label htmlFor="settings__display_difficult_btn">Отображать кнопку “Сложные”</label>
            </div>
            <div className="settings__input-group">
              <input type="checkbox" name="settings__display_assessment_btns" id="settings__display_assessment_btns" />
              <label htmlFor="settings__display_assessment_btns">Отображать кнопки “Снова”, “Трудно”, “Хорошо”, “Легко”</label>
            </div>
          </div>
          <button type="button">Сохранить</button>
        </form>
      </div>
    );
  }
}
