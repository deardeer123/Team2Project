package com.green.Team2Project.range.rangeService;

import jakarta.annotation.Resource;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("rangeService")
public class RangeServiceImpl implements RangeService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void selectAllRange() {
        sqlSession.selectList("rangeMapper.selectAllRange");
    }
}
