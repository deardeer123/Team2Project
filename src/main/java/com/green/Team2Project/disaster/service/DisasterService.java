package com.green.Team2Project.disaster.service;

import com.green.Team2Project.disaster.vo.DisasterVO;

import java.util.List;

public interface DisasterService {

    List<DisasterVO> selectAllDisaster();

    DisasterVO selectOneDisaster(int occurredYear);
}
