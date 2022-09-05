import sys
import os
import pandas as pd
import piper
import gibbs
import drovo
import chadha

def splitList(inputList, n):
    for i in range(0, len(inputList), n):
        yield inputList[i:i + n]

listData = sys.argv[1]
noOfElement = int(sys.argv[2])

toList = listData.split(',')

size = int(len(toList)/noOfElement)

array= splitList(toList, size)
matrix = list(array)

matrixInt = [list( map(float,i) ) for i in matrix]


sampleArr = ["sample"] * size
labelArr = ["C1"] * size
colorArr = ["blue"] * size
markerArr = ["o"] * size
sizeArr = [30] * size
alphaArr = [0.6] * size


data = {
    'Sample' : sampleArr,
    'Label'  : labelArr,
    'Color'  : colorArr,
    'Marker' : markerArr,
    'Size'   : sizeArr,
    'Alpha'  : alphaArr,
    'Ca'     : matrixInt[0],
    'Mg'     : matrixInt[1],
    'Na'     : matrixInt[2],
    'K'      : matrixInt[3],
    'HCO3'   : matrixInt[4],
    'CO3'    : matrixInt[5],
    'Cl'     : matrixInt[6],
    'SO4'    : matrixInt[7],
    'TDS'    : matrixInt[8]
}


df = pd.DataFrame(data)
parent  = os.path.dirname(os.getcwd())

piper.plot(df, unit='mg/L', figname='triangle Piper diagram', figformat='jpg')
drovo.plot(df, unit='mg/L', figname='Durvo diagram', figformat='jpg')
gibbs.plot(df, unit='mg/L', figname='Gibbs diagram', figformat='jpg')
chadha.plot(df, unit='mg/L', figname='Chadha diagram', figformat='jpg')


print(parent)
sys.stdout.flush()

