package com.green.Team2Project.range.rangeService;


import com.green.Team2Project.range.vo.RangeVO;

import java.util.List;

public interface RangeService {

    List<RangeVO> selectAllRange();

    RangeVO detail(int occurredYear);

}
