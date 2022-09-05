import os
import math
import numpy as np
import pandas as pd
import matplotlib as mpl
import matplotlib.pyplot as plt

from ions import ions_WEIGHT, ions_CHARGE


mpl.rcParams['lines.markersize'] = 6


def plot(df, 
         unit='mg/L', 
         figname='Durvo diagram', 
         figformat='jpg'):


    ALLOWED_UNITS = ['mg/L', 'meq/L']
    if unit not in ALLOWED_UNITS:
        raise RuntimeError("""
        Currently only mg/L and meq/L are supported.
        Convert the unit manually if needed.""")
        
    # Calculate the traingles' location
    h = 0.5 * np.tan(np.pi / 3.0) 
    ltriangle_x = np.array([0, -h, 0, 0])
    ltriangle_y = np.array([0, 0.5, 1, 0])
    ttriangle_x = np.array([0, 0.5, 1, 0])
    ttriangle_y = np.array([1, 1 + h, 1, 1])
    
    # Calculate the rectangles' location 
    crectangle_x = np.array([0, 0, 1, 1, 0]) 
    crectangle_y = np.array([0, 1, 1, 0, 0]) 
    

    
    # Plot the traingles and rectangles
    fig = plt.figure(figsize=(10,10), dpi=100)
    ax = fig.add_subplot(111, aspect='equal', 
                         frameon=False, xticks=[], yticks=[])
    ax.plot(ltriangle_x, ltriangle_y, '-k', lw=1.0)
    ax.plot(ttriangle_x, ttriangle_y, '-k', lw=1.0)
    ax.plot(crectangle_x, crectangle_y, '-k', lw=1.0) 
    

    linterval = 0.1
    ticklabels = ['0', '10', '20', '30', '40', '50',
                  '60', '70', '80', '90', '100']
    ticklength = 0.02
    # Left traingle
    for i, x in enumerate(np.linspace(-h, 0, int(1 / linterval + 1))):
        ax.plot([x, x + ticklength * np.sin(np.pi / 3.0)], 
                [-x * np.tan(np.pi / 6.0), -x * np.tan(np.pi / 6.0) + ticklength * np.sin(np.pi / 6.0)], 
                'k', lw=1.0)
        if i in [0, 2, 4, 6, 8]:
            ax.plot([x, 0], [-x * np.tan(np.pi / 6.0), -x / np.sin(np.pi / 3.0)], 'k:')
            ax.text(x - ticklength * np.sin(np.pi / 3.0), -x * np.tan(np.pi / 6.0) - 4 * ticklength * np.sin(np.pi / 6.0), 
                    ticklabels[i], rotation=-30, ha='center', va='center')
    ax.annotate('%' + '$Na^+$' +'+%' + '$K^+$', 
                xy=(-0.2, 0.005), xycoords='data',
                ha="left", va="center",
                xytext=(-100, 32), textcoords='offset points',
                size=12, rotation=-30,
                arrowprops=dict(arrowstyle="simple", fc="k", ec="k"))
    ax.text(-h - 0.05, 0.5, '  100% Mg' + '$^{2+}$', rotation=90, 
            ha='center', va='center', fontsize=12)
    
    for i, x in enumerate(np.linspace(-h, 0, int(1 / linterval + 1))):
        ax.plot([x, x + ticklength * np.sin(np.pi / 3.0)], 
                [0.5 + (h + x) * np.tan(np.pi / 6.0), 0.5 + (h + x) * np.tan(np.pi / 6.0) - ticklength * np.sin(np.pi / 6.0)], 
                'k', lw=1.0)
        if i in [0, 2, 4, 6, 8]:
            ax.plot([x, 0], [0.5 + (h + x) * np.tan(np.pi / 6.0), 1 + x / np.sin(np.pi / 3.0)], 'k:')
            ax.text(x - ticklength * np.sin(np.pi / 3.0), 0.5 + (h + x) * np.tan(np.pi / 6.0) +  4 * ticklength * np.sin(np.pi / 6.0), 
                    ticklabels[i], rotation=30, ha='center', va='center')
    ax.annotate('%' + '$Ca^{2+}$', 
                xy=(-0.3, 1.0), xycoords='data',
                ha="left", va="center",
                xytext=(-68, -28), textcoords='offset points',
                size=12, rotation=30,
                arrowprops=dict(arrowstyle="simple", fc="k", ec="k")) 
    # top traingle
    for i, x in enumerate(np.linspace(0, 0.5, int(1 / linterval + 1))):
        ax.plot([x, x + ticklength * np.sin(np.pi / 6.0)], 
                [1 + x * np.tan(np.pi / 3.0), 1 + x * np.tan(np.pi / 3.0) - ticklength * np.sin(np.pi / 6.0)], 
                'k', lw=1.0)
        if i in [2, 4, 6, 8,10]:
            ax.plot([x, x / np.sin(np.pi / 6.0)], [1 + x * np.tan(np.pi / 3.0), 1], 'k:')
            ax.text(x - 4 * ticklength * np.sin(np.pi / 6.0), 1 + x * np.tan(np.pi / 3.0) + ticklength * np.sin(np.pi / 6.0),
                    ticklabels[-i - 1], rotation=60, ha='center', va='center')
    ax.annotate('$Cl^-$' + '%', 
                xy=(0.0, 1.28), xycoords='data',
                ha="left", va="center",
                xytext=(15, 42), textcoords='offset points',
                size=12, rotation=60,
                arrowprops=dict(arrowstyle="simple", fc="k", ec="k")) 
    for i, x in enumerate(np.linspace(0.5, 1, int(1 / linterval + 1))):
        ax.plot([x, x - ticklength * np.sin(np.pi / 6.0)], 
                [1 + (1 - x) * np.tan(np.pi / 3.0), 1 + (1 - x) * np.tan(np.pi / 3.0) - ticklength * np.sin(np.pi / 3.0)], 
                'k', lw=1.0)
        if i in [2, 4, 6, 8,10]:
            ax.plot([x, (x - 0.5) / np.sin(np.pi / 6.0)], [1 + (1 - x) * np.tan(np.pi / 3.0), 1], 'k:')
            ax.text(x +  4 * ticklength * np.sin(np.pi / 6.0), 1 + (1 - x) * np.tan(np.pi / 3.0) + ticklength * np.sin(np.pi / 3.0), 
                    ticklabels[i], rotation=-60, ha='center', va='center')
    ax.annotate('$HCO_3^-$'+ '+' + '$CO_3^{2-}$', 
                xy=(1.17, 1.05), xycoords='data',
                ha="left", va="center",
                xytext=(-78, 70), textcoords='offset points',
                size=12, rotation=-60,
                arrowprops=dict(arrowstyle="simple", fc="k", ec="k")) 
    ax.text(0.5, h + 1.05, '  100% SO' + '$_4^{2-}$', rotation=0, 
            ha='center', va='center', fontsize=12)
    # Center rectangle
    x = [45, 1, 34, 78, 100]
    y = [8, 10, 23, 78, 2]
    for x in np.linspace(0, 1, int(1 / linterval + 1)):
        ax.plot([x, x], 
                [1, 1 - ticklength], 
                'k', lw=1.0)
    for x in np.linspace(0, 1, int(1 / linterval + 1)):
        ax.plot([0, ticklength], 
                [x, x], 
                'k', lw=1.0)
    #plt.grid(color = 'green', linestyle = '--', linewidth = 0.5)
    nums = []
    for i in range(3):
       nums.append([])
    for j in range(1, 4):
           nums[i].append(j)
    
    
    # Label the watertypes in the central rectangle
    ax.text(0.15, 0.1, 'NaCl', ha='center', va='center', fontsize=12)
    ax.text(0.8, 0.9, 'CaHCO$_3$', ha='center', va='center', fontsize=12)
    
    # Convert unit if needed
    if unit == 'mg/L':
        gmol = np.array([ions_WEIGHT['Ca'], 
                     ions_WEIGHT['Mg'], 
                     ions_WEIGHT['Na'], 
                     ions_WEIGHT['K'], 
                     ions_WEIGHT['HCO3'],
                     ions_WEIGHT['CO3'], 
                     ions_WEIGHT['Cl'], 
                     ions_WEIGHT['SO4'],  
                    ])     
        eqmol = np.array([ions_CHARGE['Ca'], 
                          ions_CHARGE['Mg'], 
                          ions_CHARGE['Na'], 
                          ions_CHARGE['K'], 
                          ions_CHARGE['HCO3'], 
                          ions_CHARGE['CO3'], 
                          ions_CHARGE['Cl'], 
                          ions_CHARGE['SO4'], 
                          ]) 
        tmpdf = df[['Ca', 'Mg', 'Na', 'K', 'HCO3', 'CO3', 'Cl', 'SO4']]
        dat = tmpdf.values
        
        meqL = (dat / abs(gmol)) * abs(eqmol)
        
    elif unit == 'meq/L':
        meqL = df[['Ca', 'Mg', 'Na', 'K', 'HCO3', 'CO3', 'Cl', 'SO4']].values
    
    else:
        raise RuntimeError("""
        Currently only mg/L and meq/L are supported.
        Convert the unit if needed.""")
    
    # Calculate the percentages
    sumcat = np.sum(meqL[:, 0:4], axis=1)
    suman = np.sum(meqL[:, 4:8], axis=1)
    cat = np.zeros((dat.shape[0], 3))
    an = np.zeros((dat.shape[0], 3))
    cat[:, 0] = meqL[:, 0] / sumcat                     # Percentage Ca
    cat[:, 1] = meqL[:, 1] / sumcat                     # Percentage Mg
    cat[:, 2] = (meqL[:, 2] + meqL[:, 3]) / sumcat      # Percentage Na+K
    an[:, 0] = (meqL[:, 4] + meqL[:, 5]) / suman        # Percentage HCO3 + CO3
    an[:, 2] = meqL[:, 6] / suman                       # Percentage Cl
    an[:, 1] = meqL[:, 7] / suman                       # Percentage SO4
    
    cat_x = -np.sin(np.pi / 3.0) * (1 -  cat[:, 2] - cat[:, 0])
    cat_y = np.sin(np.pi / 6.0) * (1 -  cat[:, 2] - cat[:, 0]) + cat[:, 0]
    an_x = np.sin(np.pi / 6.0) * (1 - an[:, 2]) + np.sin(np.pi / 6.0) * an[:, 0] 
    an_y = 1 + np.sin(np.pi / 3.0) * (1 - an[:, 2] - an[:, 0])

    
    # Plot the scatters
    Labels = []
    for i in range(len(df)):
        if (df.at[i, 'Label'] in Labels or df.at[i, 'Label'] == ''):
            TmpLabel = ''
        else:
            TmpLabel = df.at[i, 'Label']
            Labels.append(TmpLabel)
    
        try:
            plt.scatter(cat_x[i], cat_y[i], 
                        marker=df.at[i, 'Marker'],
                        s=df.at[i, 'Size'], 
                        color=df.at[i, 'Color'], 
                        alpha=df.at[i, 'Alpha'],
                        #label=TmpLabel, 
                        edgecolors='black')
            plt.scatter(an_x[i], an_y[i], 
                        marker=df.at[i, 'Marker'],
                        s=df.at[i, 'Size'], 
                        color=df.at[i, 'Color'], 
                        alpha=df.at[i, 'Alpha'],
                        #label=TmpLabel, 
                        edgecolors='black')
            plt.scatter(an_x[i], cat_y[i], 
                        marker=df.at[i, 'Marker'],
                        s=df.at[i, 'Size'], 
                        color=df.at[i, 'Color'], 
                        alpha=df.at[i, 'Alpha'],
                        label=TmpLabel, 
                        edgecolors='black')

        except(ValueError):
                pass

            
    # Creat the legend
    plt.legend(loc='upper left', markerscale=1, frameon=False, fontsize=12,
               labelspacing=0.25, handletextpad=0.25)
    
    # Display the info
    cwd = os.getcwd()
    
    # Save the figure
    plt.savefig('D:\\Monish\\Code\\Personal Project\\hydrochemicalanalysis\\src\\app\\containers\\Dashboard\\'+figname + '.' + figformat, format=figformat, 
                bbox_inches='tight', dpi=300)
    
    return



# if __name__ == '__main__':
#     data = {
#     'Sample' : ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
#     'Label'  : ['C1', 'C2', 'C2', 'C3', 'C3', 'C1'],
#     'Color'  : ['red', 'green', 'green', 'blue', 'blue', 'red'],
#     'Marker' : ['o', 'o', 'o', 'o', 'o', 'o'],
#     'Size'   : [30, 30, 30, 30, 30, 30],
#     'Alpha'  : [0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
#     'Ca'     : [640, 660,120,1052.4,6,7.2],
#     'Mg'     : [1520,924.7,304.06,664.1,5,0.5],
#     'Na'     : [7625,5600,6000,3586,15,3.7],
#     'K'      : [8.5,72,60,45.5,0.4,1.5],
#     'CO3'    : [0,0,0,34.5,0,0],
#     'HCO3'   : [439,769,366,99.61,31,24],
#     'Cl'     : [16330,11132,8190,6156.16,14,5.7],
#     'SO4'    : [318,971,2468,2310,1,0.32]
#     }
#     df = pd.DataFrame(data)
#     plot(df, unit='mg/L', figname='Durvo diagram', figformat='jpg')
