package com.green.Team2Project.electricAccidentsByTime.service;

import com.green.Team2Project.electricAccidentsByTime.vo.ElectricAccidentsByTimeVO;

import java.util.List;
import java.util.Map;

public interface ElectricAccidentsByTimeService {
    
//    주간 야간 심야
    List<ElectricAccidentsByTimeVO> selectDayTimeList(int occurredYear);
    List<ElectricAccidentsByTimeVO> selectNightList(int occurredYear);
    List<ElectricAccidentsByTimeVO> selectLateNightList(int occurredYear);
    //평균
    Map<String, Object> selectAvgTimeDataList();
    Map<String, Object> selectAvgTimeDataList2();

    //전체
    Map<String, Object> selectAllTimeDataList();


}
