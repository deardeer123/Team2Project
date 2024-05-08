package com.green.Team2Project.range.rangeService;

import com.green.Team2Project.range.vo.RangeVO;
import jakarta.annotation.Resource;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("rangeService")
public class RangeServiceImpl implements RangeService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<RangeVO> selectAllRange() {
        return sqlSession.selectList("rangeMapper.selectAllRange");
    }

    @Override
    public RangeVO detail(int occurredYear) {
        return sqlSession.selectOne("rangeMapper.detail", occurredYear);
    }

    @Override
    public RangeVO totalRange(int occurredYear) {
        return sqlSession.selectOne("rangeMapper.totalRange",occurredYear);
    }

    @Override
    public RangeVO maxBurnRange05() {
        return sqlSession.selectOne("rangeMapper.maxBurnRange05");
    }

}
