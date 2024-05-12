package com.green.Team2Project.electricAccidentsByDay.service;

import com.green.Team2Project.electricAccidentsByDay.vo.ElectricAccidentsByDayVO;
import com.green.Team2Project.home.vo.SearchVO;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public interface ElectricAccidentsByDayService {
    ElectricAccidentsByDayVO selectAccidentDay();
    Map<String , Object> avgDay();
    Map<String , Object> avgDay2();

    List<ElectricAccidentsByDayVO> allDay();
    Map<String , Object> selectDay(int occurredYear);
}
