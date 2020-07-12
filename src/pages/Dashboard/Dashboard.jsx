import React from 'react';
import Spinner from '../../components/Spinner/Spinner';
import TodayGoal from './TodayGoal/TodayGoal';
import TodayStatistics from './TodayStatistics/TodayStatistics';
import TotalStatistics from './TotalStatistics/TotalStatistics';
import { setDefaultStatistics, getUserStatistics } from '../../services/userStatistics';
import { getUserSettings } from '../../services/settingsService';
import getUserAggregatedWords from '../../services/userAggregatedWords';
import './Dashboard.scss';

const filters = {
  inProgress: '{"$and":[{"userWord.optional.deleted":false},{"userWord.optional.indicator":{"$ne":5}}]}',
  learnedWords: '{"$and":[{"userWord.optional.deleted":false},{"userWord.optional.indicator":5}]}',
};

class Dashboard extends React.PureComponent {
  todayStatisticsData = null;

  totalStatistics = null;

  cardsPerDay = null;

  constructor(props) {
    super(props);
    this.state = {
      isdataLoaded: false,
    };
  }

  componentDidMount = async () => {
    const userSettingData = await getUserSettings(localStorage.userToken, localStorage.userId);
    this.cardsPerDay = userSettingData.optional.maxCardsPerDay;
    const inProgressWords = await getUserAggregatedWords(filters.inProgress);
    const learnedWords = await getUserAggregatedWords(filters.learnedWords);
    this.totalStatistics = {
      inProgressWordsCount: inProgressWords[0]?.totalCount[0]?.count || 0,
      learnedWordsCount: learnedWords[0]?.totalCount[0]?.count || 0,
    };

    let userStatisticsRequest = await getUserStatistics();
    if (!userStatisticsRequest) {
      await setDefaultStatistics();
      userStatisticsRequest = await getUserStatistics();
    }
    this.todayStatisticsData = userStatisticsRequest.optional.today;
    this.setState({
      isdataLoaded: true,
    });
  }

  render() {
    const { todayStatisticsData, totalStatistics, cardsPerDay } = this;
    const { isdataLoaded } = this.state;
    return (
      <div className="Dashboard">
        {isdataLoaded ? (
          <div className="Dashboard__container">
            <TodayGoal cardsPerDay={cardsPerDay} todayStatisticsData={todayStatisticsData} />
            <TodayStatistics todayStatisticsData={todayStatisticsData} />
            <TotalStatistics totalStatistics={totalStatistics} />
          </div>
        ) : <Spinner />}
      </div>
    );
  }
}

export default Dashboard;
