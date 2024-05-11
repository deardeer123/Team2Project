package com.green.Team2Project.range.controller;

import com.green.Team2Project.range.rangeService.RangeServiceImpl;
import com.green.Team2Project.range.vo.RangeVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.naming.Name;
import java.util.List;

@Controller
@RequestMapping("/range")
public class RangeController {
    @Resource(name = "rangeService")
    private RangeServiceImpl rangeService;


    // 메인화면 화상범위 전체 데이터 목록
    @PostMapping("/allRange")
    @ResponseBody
    public List<RangeVO> allRange(){
        return rangeService.selectAllRange();
    }

    @GetMapping("/detailRange")
    public String detailRange(Model model){
        model.addAttribute("rangeList", rangeService.selectAllRange());
        model.addAttribute("rangeVO",rangeService.detail(2022));
        model.addAttribute("selectedMenu",2);
        return "content/range/team2_range_detail.html";
    }

    @PostMapping("/detailRangeOne")
    @ResponseBody
    public RangeVO detail(@RequestParam(name = "occurredYear") int occurredYear){
        return rangeService.detail(occurredYear);
    }



}
