package com.green.Team2Project.disaster.controller;

import com.green.Team2Project.disaster.service.DisasterService;
import com.green.Team2Project.disaster.vo.DisasterVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/disaster")
public class DisasterController {
    @Resource(name = "disasterService")
    private DisasterService disasterService;

    //전기 재해 현황 목록
    @PostMapping("/selectAllDisaster")
    @ResponseBody
    public List<DisasterVO> selectAllDisaster(){
        List<DisasterVO> disasterList = disasterService.selectAllDisaster();
        return disasterList;
    }

    @PostMapping("/selectOneDisaster")
    @ResponseBody
    public DisasterVO selectOneDisaster(@RequestParam(name = "occurredYear") int occurredYear){
        DisasterVO disaster = disasterService.selectOneDisaster(occurredYear);
        return disaster;
    }

    @GetMapping("/disasterDetail")
    public String disasterDetail(){
        return "content/disaster/team2_disaster_detail";
    }
}
