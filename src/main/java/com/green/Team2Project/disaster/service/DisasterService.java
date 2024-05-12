package com.green.Team2Project.disaster.service;

import com.green.Team2Project.disaster.vo.DisasterVO;

import java.util.List;

public interface DisasterService {

    List<DisasterVO> selectAllDisaster();

    DisasterVO selectOneDisaster(int occurredYear);
    //메인화면에 쓸 데이터
    DisasterVO mainAvgDisaster();
}
