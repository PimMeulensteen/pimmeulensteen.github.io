import numpy as np
from PIL import Image 


MAX_RANGE = 3**7 #Amount of pixels
GENERATION = 6 #N of generations
 

interval = []

def generate():

    for i in range(1,GENERATION+1):
    #For each generation
        
        sub_interval = []

        #Algorithm to check whether or not a x,y-value belongs to a certain generation.
        for j in range(0,(3**(i-1))):
            for n in range(int((3*j+1)*MAX_RANGE/(3**i)),int((3*j+2)*MAX_RANGE/(3**i))):
                sub_interval.append(n)
                
        interval.append(set(sub_interval)) #Use a set to dramatically increase lookup time

        
    my_array = []
    
    for a in range(0,MAX_RANGE):
        #a is the x-coord
        my_sub_array = []
        for b in range(0,MAX_RANGE):
            #b is they-coord
            to_fill = 1 #Make all squares white by default
            for g in range(0,GENERATION):
                if a in interval[g] and b in interval[g]:
                    to_fill = 0
                    #if the a,b-coord belongs to ANY generation, make it black.
            my_sub_array.append(to_fill)
        my_array.append(my_sub_array)

    my_array = np.array(my_array) #Make the array into a numpy array.

    im = Image.fromarray(my_array.reshape((MAX_RANGE,MAX_RANGE)).astype('uint8')*255) #Make np.array to an actual image.0

    im.save("res/aa1.png")


generate()

