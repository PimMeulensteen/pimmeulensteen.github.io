from PIL import Image
import xlsxwriter

im = Image.open('e2.jpg') 
pix = im.load()
workbook = xlsxwriter.Workbook('excel2.xlsx')
worksheet = workbook.add_worksheet()

for x in range(im.size[1]):
    print(x)
    for y in range(im.size[0]):
       
        worksheet.write(x, y*3, pix[y,x][0])
        worksheet.write(x, y*3+1, pix[y,x][1])
        worksheet.write(x, y*3+2, pix[y,x][2])

for y in range(im.size[1]):
    worksheet.conditional_format(0,y*3,im.size[1]+4,y*3, {'type':      '2_color_scale',       
                                                          'min_value': '0',
                                                        'max_value': '255',
                                                        'min_color': "#000000",
                                                        'max_color': "#FF0000"})
    worksheet.conditional_format(0,y*3+1,im.size[1]+4,y*3+1, {'type':      '2_color_scale',
                                                            'min_color': "#000000",
                                                        'max_color': "#00FF00",
                                                   'min_value': '0',
                                                   'max_value': '255'})
    worksheet.conditional_format(0,y*3+2,im.size[1]+4,y*3+2, {'type':      '2_color_scale',
                                                            'min_color': "#000000",
                                                        'max_color': "#0000FF",
                                                   'min_value': '0',
                                                   'max_value': '255'})

for x in range(im.size[0]*3):
    worksheet.write(im.size[1]+1,x, 0)
    worksheet.write(im.size[1]+2,x, 255)

workbook.close()
