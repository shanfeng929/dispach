package com.sunyard.dispatch.common;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.sunyard.dispatch.util.CommonUtils;

/**   
 * @Description: Excel导出基础类
 * @author zhangwenfeng031  
 * @date 2016年10月27日 上午10:06:15 
 * @version Version 1.0.1
*/
public class ExcelView extends AbstractExcelView {
	
	public static final short align_left = HSSFCellStyle.ALIGN_LEFT;
	public static final short align_center = HSSFCellStyle.ALIGN_CENTER;
	public static final short align_right = HSSFCellStyle.ALIGN_RIGHT;
	
	private String fileName;
	private String sheetName;
	private String[] headers;
	private String[] mappers;
	private String[][] dataList;
	
	private int[] widths = null;
	private short[] aligns = null;
	
	private static Logger logger = LoggerFactory.getLogger(CommonUtils.class);
	
	/**   
	* @Description: 基于数据类型 List<Map<String,Object>>  的excel导出
	* @author zhangwenfeng031  
	* @date 2016年10月27日 下午3:03:47 
	* @version Version 1.0.1  
	*/
	public ExcelView(String filename, String sheetName, String[] headers, String[] mappers, List<Map<String,Object>> datas){
		super();
		encodeFileName(filename);
		this.sheetName = sheetName;
		this.headers = headers;
		this.mappers = mappers;
		initDataMap(datas);
	}
	
	/**   
	* @Description: 基于数据类型 List<Entity>  的excel导出
	* @author zhangwenfeng031  
	* @date 2016年10月27日 下午3:03:47 
	* @version Version 1.0.1  
	*/
	public ExcelView(String filename, String sheetName, String[] headers, List<?> datas, String[] propertys){
		super();
		encodeFileName(filename);
		this.sheetName = sheetName;
		this.headers = headers;
		this.mappers = propertys;
		initDataEntity(datas);
	}
	
	/**   
	* @Description: 基于数据类型 List<Entity>  的excel导出
	* @author zhangwenfeng031  
	* @date 2016年10月27日 下午3:03:47 
	* @version Version 1.0.1  
	*/
	public ExcelView(String filename, String sheetName, String[] headers, List<?> datas, String[] propertys, int[] widths, short[] aligns){
		super();
		encodeFileName(filename);
		this.sheetName = sheetName;
		this.headers = headers;
		this.mappers = propertys;
		this.widths = widths;
		this.aligns = aligns;
		initDataEntity(datas);
	}
	
	@Override
	protected void buildExcelDocument(Map<String, Object> map, HSSFWorkbook workbook, HttpServletRequest request,HttpServletResponse response){
		OutputStream ouputStream = null;
		try {
			checkData();
			HSSFSheet sheet = workbook.createSheet(sheetName);
			initHeader(workbook, sheet);
			initExcelData(workbook, sheet);
	        String codedFileName = java.net.URLEncoder.encode(fileName, "UTF-8");
	        response.setHeader("Content-Disposition", "attachment; filename=\"" + codedFileName + ".xlsx\"");
	        ouputStream = response.getOutputStream();
	        workbook.write(ouputStream);
	        ouputStream.flush();
	        ouputStream.close();
		} catch (Exception e) {
			logger.error("导出文件异常，fileName="+this.fileName,e);
		}
	}
	
	/**   
	 * @Description: 设置excel表数据
	 * @author zhangwenfeng031
	 * @date 2016年10月27日 上午11:06:39 
	 * @version Version 1.0.1 
	*/
	private void initExcelData(HSSFWorkbook workbook, HSSFSheet sheet){
		if(dataList != null && dataList.length > 0){
			HSSFRow row;
			for(int i=0; i<dataList.length; i++){
				row= sheet.createRow(i+1);
				HSSFCell cell;
				for(int j=0; j<dataList[i].length; j++){
					cell = row.createCell(j);
		            cell.setCellType(HSSFCell.CELL_TYPE_STRING);
		            cell.setCellValue(dataList[i][j]);
		            HSSFCellStyle style = getGridStyle(workbook);
		            if(j==0){
		        		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		            }
		            if(j==dataList[i].length){
		        		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		            }
		            if(aligns != null && aligns.length>=j){
		            	style.setAlignment(aligns[j]);
		            }else{
		            	style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		            }
		            cell.setCellStyle(style);
				}
			}
		}
	}
	
	/**   
	 * @Description: 设置excel表头
	 * @author zhangwenfeng031  @param sheet
	 * @date 2016年10月27日 上午10:25:08 
	 * @version Version 1.0.1 
	*/
	private void initHeader(HSSFWorkbook workbook, HSSFSheet sheet){
		if(headers != null && headers.length > 0){
			HSSFRow row= sheet.createRow(0);
			HSSFCell cell = null;
			for(int i=0; i< headers.length; i++){
				cell = row.createCell(i);
	            cell.setCellType(HSSFCell.CELL_TYPE_STRING);
	            cell.setCellValue(headers[i]);
	            cell.setCellStyle(getHeaderStyle(workbook));
	            if(widths != null && widths.length>=i){
	            	sheet.setColumnWidth(i, 256*widths[i]);
	            }else{
	            	sheet.setColumnWidth(i, 256*20);
	            }
			}
		}
		
	}
	
	/**   
	 * @Description: 验证参数
	 * @author zhangwenfeng031 
	 * @date 2016年10月27日 上午10:05:49 
	 * @version Version 1.0.1 
	*/
	private void checkData() throws Exception{
		if(sheetName != null && sheetName.length() == 0){
			throw new Exception("Excel导入异常，SheetName名不可为空！");
		}
		if(headers == null || headers.length == 0){
			throw new Exception("Excel导入异常，表头为空！");
		}
	}
	
	/**   
	 * @Description: 将List<Map<String,Object>>转为String[][]
	 * @author zhangwenfeng031  @param datas
	 * @date 2016年10月27日 下午1:48:44 
	 * @version Version 1.0.1 
	*/
	private void initDataMap(List<Map<String,Object>> datas){
		if(this.mappers == null || this.mappers.length == 0 || datas == null || datas.size() == 0){
			return;
		}
		for(int i=0; i< datas.size(); i++){
			Map<String,Object> line = datas.get(i);
			if(line != null && line.size() >0){
				if(this.dataList == null){
					this.dataList = new String[datas.size()][this.mappers.length];
				}
				for(int j=0; j<line.size() && j<this.mappers.length;j++){
					Object value = line.get(this.mappers[i]);
					this.dataList[i][j] = ObjectToString(value);
				}
			}
		}
	}
	
	/**   
	 * @Description: 将List<T>转为String[][]
	 * @author zhangwenfeng031
	 * @date 2016年10月27日 下午2:11:29 
	 * @version Version 1.0.1 
	*/
	private void initDataEntity(List<?> datas){
		if(this.mappers == null || this.mappers.length == 0 || datas == null || datas.size() == 0){
			return;
		}
		Object item0 = datas.get(0);
		BeanInfo beanInfo;
		try {
			beanInfo = Introspector.getBeanInfo(item0.getClass());
			PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
			if(propertyDescriptors == null){
				return;
			}
			this.dataList = new String[datas.size()][this.mappers.length];
	        for (PropertyDescriptor property : propertyDescriptors) {  
	            Method getter = property.getReadMethod();
	            if (getter != null) {
	            	int cosIndex = -1;
	            	for(int j=0; j<this.mappers.length;j++){
	            		if(property.getName().equalsIgnoreCase(this.mappers[j])){
	            			cosIndex = j;
	            		}
	            	}
	            	if(cosIndex > -1){
	            		for(int i=0; i< datas.size(); i++){
	            			Object item = datas.get(i);
	            			Object value = getter.invoke(item);
	            			this.dataList[i][cosIndex] = ObjectToString(value);
		            	}
	            	}
	            }  
	        }
		} catch (Exception e) {
			logger.error("Excel文件生成异常!", e);
		} 
	}
	
	
	/**   
	 * @Description: 将对象转为字符类型
	 * @author zhangwenfeng031  
	 * @date 2016年10月27日 下午2:14:46 
	 * @version Version 1.0.1 
	*/
	private String ObjectToString(Object obj){
		if(obj == null){
			return "";
		}
		if(obj.getClass() == String.class){
			return String.valueOf(obj);
		}else if(obj.getClass() == Date.class){
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			return sdf.format((Date) obj);
		}else if(obj.getClass() == BigDecimal.class){
			return String.valueOf(obj);
		}else{
			return String.valueOf(obj);
		}
	}
	
	/**   
	 * @Description: 文件名
	 * @author zhangwenfeng031  
	 * @date 2016年10月27日 下午2:55:19 
	 * @version Version 1.0.1 
	*/
	private void encodeFileName(String filename){
		if(filename == null || filename.length() == 0){
			filename = "newFile";
		}
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
		this.fileName = filename + sdf.format(new Date());
	}
	
	/**   
	 * @Description: 表头样式
	 * @author zhangwenfeng031  
	 * @date 2016年11月1日 上午9:01:05 
	 * @version Version 1.0.1 
	*/
	private HSSFCellStyle getHeaderStyle(HSSFWorkbook workbook){
		// 生成一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		// 设置这些样式
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);//水平居中 
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直居中
		 // 背景色
		style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND); 
		style.setFillBackgroundColor(HSSFColor.SKY_BLUE.index); 
		// 设置边框
//		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
//		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
//		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
//		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		// 自动换行  
		style.setWrapText(false);  
		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setFontHeightInPoints((short) 10);
		font.setColor(HSSFColor.WHITE.index);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		font.setFontName("Times New Roman");
		// 把字体 应用到当前样式
		style.setFont(font);
		return style;
	}
	
	/**   
	 * @Description: 数据表格样式
	 * @author zhangwenfeng031  
	 * @date 2016年11月1日 上午9:01:21 
	 * @version Version 1.0.1 
	*/
	private HSSFCellStyle getGridStyle(HSSFWorkbook workbook){
		// 生成一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		// 设置这些样式
		style.setAlignment(HSSFCellStyle.ALIGN_LEFT);//水平居左 
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直居中
		// 设置边框
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		// 自动换行  
		style.setWrapText(false);
		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setFontHeightInPoints((short) 10);
		font.setColor(HSSFColor.BLACK.index);
		font.setFontName("Arial");
		// 把字体 应用到当前样式
		style.setFont(font);
		return style;
	}
}
