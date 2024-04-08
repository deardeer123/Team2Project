package com.green.Team2Project.electricAccidentsByDay.controller;

import com.green.Team2Project.electricAccidentsByDay.service.ElectricAccidentsByDayService;
import com.green.Team2Project.electricAccidentsByDay.vo.ElectricAccidentsByDayVO;
import com.green.Team2Project.home.vo.SearchVO;
import jakarta.annotation.Resource;
import org.apache.ibatis.annotations.ResultMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/day")
public class ElectricAccidentsByDayController {
    @Resource(name = "electricAccidentsByDayService")
    ElectricAccidentsByDayService electricAccidentsByDayService;

    @ResponseBody
    @PostMapping("/getDayFetch")
    public ElectricAccidentsByDayVO getDateFetch( ){


        ElectricAccidentsByDayVO electricAccidentsByDayVO = electricAccidentsByDayService.selectAccidentDay();

        return electricAccidentsByDayVO;
    }

}
