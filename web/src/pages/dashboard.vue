<template>
    <div>
        <div id="pie" style="width: 600px;height:400px;"></div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table :data="props.row.jobList" label-position="left" inline>
                        <el-table-column
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                label="JobName"
                                prop="jobName"
                                width="400px">
                        </el-table-column>
                        <el-table-column
                                label="LastBuild"
                                prop="lastBuild">
                        </el-table-column>
                        <el-table-column
                                label="LastCompletedBuild"
                                prop="lastCompletedBuild">
                        </el-table-column>
                        <el-table-column
                                label="LastSuccessfulBuild"
                                prop="lastSuccessfulBuild">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                    label="JobType"
                    prop="jobType">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { getJobs } from "../axios/api";
    import echarts from '@/lib/echarts'
    export default {
        name: "dashboard",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getJobData() {
                getJobs().then((res) => {
                    if (res.status === 200) {
                        this.tableData = res.data;
                    }
                })
            },
            drawChart() {
                let myChart = echarts.init(document.getElementById("pie"));
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                };
                myChart.setOption(option);
            }
        },
        mounted() {
            this.getJobData();
            this.drawChart();
        }
    }
</script>

<style scoped>

</style>
