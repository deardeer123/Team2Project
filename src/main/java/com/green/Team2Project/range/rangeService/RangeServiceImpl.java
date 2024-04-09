package com.green.Team2Project.range.rangeService;

import com.green.Team2Project.range.vo.RangeVO;
import jakarta.annotation.Resource;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("rangeService")
public class RangeServiceImpl implements RangeService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public RangeVO selectAllRange() {
        return sqlSession.selectOne("rangeMapper.selectAllRange");
    }
}
