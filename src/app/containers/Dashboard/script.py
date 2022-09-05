import sys
import os
import pandas as pd
import piper
import gibbs
import drovo
import chadha

filePath = sys.argv[1]
df = pd.read_csv(filePath)
parent  = os.path.dirname(filePath)

piper.plot(df, unit='mg/L', figname='triangle Piper diagram', figformat='jpg')
drovo.plot(df, unit='mg/L', figname='Durvo diagram', figformat='jpg')
gibbs.plot(df, unit='mg/L', figname='Gibbs diagram', figformat='jpg')
chadha.plot(df, unit='mg/L', figname='Chadha diagram', figformat='jpg')

sys.stdout.flush()