import matplotlib.pyplot as plt
import sys
from flask import Flask, jsonify, request, json, send_from_directory
from flask_cors import CORS

import os
import numpy as np
import pandas as pd

import imghdr

import matplotlib
matplotlib.use('TkAgg')

app = Flask(__name__)
app_config = {"host": "0.0.0.0", "port": sys.argv[1]}

"""
---------------------- DEVELOPER MODE CONFIG -----------------------
"""
# Developer mode uses app.py
if "app.py" in sys.argv[0]:
    # Update app config
    app_config["debug"] = True

    # CORS settings
    cors = CORS(
        app,
        resources={r"/*": {"origins": "http://localhost*"}},
    )

    # CORS headers
    app.config["CORS_HEADERS"] = "Content-Type"


"""
--------------------------- REST CALLS -----------------------------
"""
# Remove and replace with your own
# @app.route("/example")
# def example():

#   # See /src/components/App.js for frontend call
#   return jsonify("Example response from Flask! Learn more in /app.py & /src/components/App.js")


colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'brown',
    'pink',
    'gray',
    'olive',
    'cyan'
]


def categorize_water(row):
    # Initialize purpose as "Unknown"
    purpose = "Unknown"

    # Check pH
    if row['pH'] >= 6.5 and row['pH'] <= 8.5:
        # Check Ca, Mg, and HCO3
        if row['Ca'] + row['Mg'] >= 60 and row['Ca'] / (row['Ca'] + row['Mg']) >= 0.2 and row['HCO3'] >= 50:
            purpose = "Drinking"
        # Check Na and Cl
        elif row['Na'] + row['Cl'] >= 200:
            purpose = "Irrigation"
        # Check TDS
        elif row['TDS'] >= 1000:
            purpose = "Industrial"
        else:
            purpose = "Not Suitable"

    return purpose


@app.route("/get_image_url", methods=["GET", "POST"])
def get_image_url():
    fileName = request.get_data().decode('utf-8')
    return send_from_directory('src/resources/plots', fileName)


@app.route("/upload", methods=["GET", "POST"])
def home():
    if (request.files):
        uploadedFile = request.files.to_dict()['file']
        file = pd.read_csv(uploadedFile)
        piperPlot(file, unit='mg/L',
                  figname='Piper Diagram', figformat='jpg')
        durovPlot(file, unit='mg/L', figname='Durov Diagram', figformat='jpg')
        gibbsPlot(file, unit='mg/L', figname='Gibbs Diagram', figformat='jpg')
        chadhaPlot(file, unit='mg/L',
                   figname='Chadha Diagram', figformat='jpg')
        file['Purpose'] = file.apply(categorize_water, axis=1)
        images = ['Piper Diagram.jpg', 'Durov Diagram.jpg',
                  'Gibbs Diagram.jpg', 'Chadha Diagram.jpg']
        return {'images': images, 'data': file.to_dict('records')}
    else:
        my_dict = {
            'Sample': [],
            'Label': [],
            'Color': [],
            'Marker': [],
            'Size': [],
            'Alpha': [],
            'pH': [],
            'Ca': [],
            'Mg': [],
            'Na': [],
            'K': [],
            'HCO3': [],
            'CO3': [],
            'Cl': [],
            'SO4': [],
            'TDS': []
        }
        uploadedData = json.loads(request.get_data().decode('utf-8'))
        for i in range(len(uploadedData)):
            my_dict['Sample'].append('sample' + str(i+1))
            my_dict['Label'].append('C' + str(i+1))
            my_dict['Color'].append(colors[i])
            my_dict['Marker'].append('o')
            my_dict['Size'].append(30)
            my_dict['Alpha'].append(0.6)
            my_dict['pH'].append(float(uploadedData[i]['pH']))
            my_dict['Ca'].append(float(uploadedData[i]['Ca']))
            my_dict['Mg'].append(float(uploadedData[i]['Mg']))
            my_dict['Na'].append(float(uploadedData[i]['Na']))
            my_dict['K'].append(float(uploadedData[i]['K']))
            my_dict['HCO3'].append(float(uploadedData[i]['HCO3']))
            my_dict['CO3'].append(float(uploadedData[i]['CO3']))
            my_dict['Cl'].append(float(uploadedData[i]['Cl']))
            my_dict['SO4'].append(float(uploadedData[i]['SO4']))
            my_dict['TDS'].append(float(uploadedData[i]['TDS']))
        file = pd.DataFrame(my_dict)
        piperPlot(file, unit='mg/L', figname='Piper Diagram', figformat='jpg')
        durovPlot(file, unit='mg/L', figname='Durov Diagram', figformat='jpg')
        gibbsPlot(file, unit='mg/L', figname='Gibbs Diagram', figformat='jpg')
        chadhaPlot(file, unit='mg/L',
                   figname='Chadha Diagram', figformat='jpg')
        file['Purpose'] = file.apply(categorize_water, axis=1)
        print(file)
        images = ['Piper Diagram.jpg', 'Durov Diagram.jpg',
                  'Gibbs Diagram.jpg', 'Chadha Diagram.jpg']
        return {'images': images, 'data': file.to_dict('records')}


def piperPlot(df,
              unit='mg/L',
              figname='Piper diagram',
              figformat='jpg'):

    if not {'Ca', 'Mg', 'Na', 'K',
            'HCO3', 'CO3', 'Cl', 'SO4'}.issubset(df.columns):
        raise RuntimeError("""
        Trilinear Piper diagram requires geochemical parameters:
        Ca, Mg, Na, K, HCO3, CO3, Cl, and SO4.
        Confirm that these parameters are provided in the input file.""")

    ALLOWED_UNITS = ['mg/L', 'meq/L']
    if unit not in ALLOWED_UNITS:
        raise RuntimeError("""
        Currently only mg/L and meq/L are supported.
        Convert the unit manually if needed.""")

    plt.style.use('default')
    plt.rcParams['font.size'] = 10
    plt.rcParams['axes.labelsize'] = 10
    plt.rcParams['axes.labelweight'] = 'bold'
    plt.rcParams['axes.titlesize'] = 10
    plt.rcParams['xtick.labelsize'] = 10
    plt.rcParams['ytick.labelsize'] = 10
    plt.rcParams['legend.fontsize'] = 10
    plt.rcParams['figure.titlesize'] = 10

    offset = 0.10
    offsety = offset * np.tan(np.pi / 3.0)
    h = 0.5 * np.tan(np.pi / 3.0)

    ltriangle_x = np.array([0, 0.5, 1, 0])
    ltriangle_y = np.array([0, h, 0, 0])
    rtriangle_x = ltriangle_x + 2 * offset + 1
    rtriangle_y = ltriangle_y

    diamond_x = np.array([0.5, 1, 1.5, 1, 0.5]) + offset
    diamond_y = h * (np.array([1, 2, 1, 0, 1])) + (offset * np.tan(np.pi / 3))

    fig = plt.figure(figsize=(10, 10), dpi=100)
    ax = fig.add_subplot(111, aspect='equal', frameon=False,
                         xticks=[], yticks=[])
    ax.plot(ltriangle_x, ltriangle_y, '-k', lw=1.0)
    ax.plot(rtriangle_x, rtriangle_y, '-k', lw=1.0)
    ax.plot(diamond_x, diamond_y, '-k', lw=1.0)

    interval = 0.2
    ticklabels = ['0', '20', '40', '60', '80', '100']
    for i, x in enumerate(np.linspace(0, 1, int(1/interval+1))):

        ax.plot([x, x - x / 2.0],
                [0, x / 2.0 * np.tan(np.pi / 3)],
                'k:', lw=1.0)

        if i in [1, 2, 3, 4]:
            ax.text(x, 0-0.03, ticklabels[-i-1],
                    ha='center', va='center')
        ax.plot([x, (1-x)/2.0+x],
                [0, (1-x)/2.0*np.tan(np.pi/3)],
                'k:', lw=1.0)

        if i in [1, 2, 3, 4]:
            ax.text((1-x)/2.0+x + 0.026, (1-x)/2.0*np.tan(np.pi/3) + 0.015,
                    ticklabels[i], ha='center', va='center', rotation=-60)
        ax.plot([x/2, 1-x/2],
                [x/2*np.tan(np.pi/3), x/2*np.tan(np.pi/3)],
                'k:', lw=1.0)

        if i in [1, 2, 3, 4]:
            ax.text(x/2 - 0.026, x/2*np.tan(np.pi/3) + 0.015,
                    ticklabels[i], ha='center', va='center', rotation=60)

        ax.plot([x+1+2*offset, x-x/2.0+1+2*offset],
                [0, x/2.0*np.tan(np.pi/3)],
                'k:', lw=1.0)

        if i in [1, 2, 3, 4]:
            ax.text(x+1+2*offset, 0-0.03,
                    ticklabels[i], ha='center', va='center')
        ax.plot([x+1+2*offset, (1-x)/2.0+x+1+2*offset],
                [0, (1-x)/2.0*np.tan(np.pi/3)],
                'k:', lw=1.0)

        if i in [1, 2, 3, 4]:
            ax.text((1-x)/2.0+x+1+2*offset + 0.026, (1-x)/2.0*np.tan(np.pi/3) + 0.015,
                    ticklabels[-i-1], ha='center', va='center', rotation=-60)
        ax.plot([x/2+1+2*offset, 1-x/2+1+2*offset],
                [x/2*np.tan(np.pi/3), x/2*np.tan(np.pi/3)],
                'k:', lw=1.0)

        if i in [1, 2, 3, 4]:
            ax.text(x/2+1+2*offset - 0.026, x/2*np.tan(np.pi/3) + 0.015,
                    ticklabels[-i-1], ha='center', va='center', rotation=60)

        ax.plot([0.5+offset+0.5/(1/interval)*x/interval, 1+offset+0.5/(1/interval)*x/interval],
                [h+offset*np.tan(np.pi/3)+0.5/(1/interval)*x/interval*np.tan(np.pi/3),
                 offset*np.tan(np.pi/3)+0.5/(1/interval)*x/interval*np.tan(np.pi/3)],
                'k:', lw=1.0)

        if i in [1, 2, 3, 4]:
            ax.text(0.5+offset+0.5/(1/interval)*x/interval - 0.026, h+offset*np.tan(np.pi/3)+0.5/(1/interval)*x/interval*np.tan(np.pi/3) + 0.015, ticklabels[i],
                    ha='center', va='center', rotation=60)
            ax.text(1+offset+0.5/(1/interval)*x/interval + 0.026, offset*np.tan(np.pi/3)+0.5/(1/interval)*x/interval*np.tan(np.pi/3) - 0.015, ticklabels[-i-1],
                    ha='center', va='center', rotation=60)
        ax.plot([0.5+offset+0.5/(1/interval)*x/interval, 1+offset+0.5/(1/interval)*x/interval],
                [h+offset*np.tan(np.pi/3)-0.5/(1/interval)*x/interval*np.tan(np.pi/3),
                 2*h+offset*np.tan(np.pi/3)-0.5/(1/interval)*x/interval*np.tan(np.pi/3)],
                'k:', lw=1.0)

        if i in [1, 2, 3, 4]:
            ax.text(0.5+offset+0.5/(1/interval)*x/interval - 0.026, h+offset*np.tan(np.pi/3)-0.5/(1/interval)*x/interval*np.tan(np.pi/3) - 0.015, ticklabels[i],
                    ha='center', va='center', rotation=-60)
            ax.text(1+offset+0.5/(1/interval)*x/interval + 0.026, 2*h+offset*np.tan(np.pi/3)-0.5/(1/interval)*x/interval*np.tan(np.pi/3) + 0.015, ticklabels[-i-1],
                    ha='center', va='center', rotation=-60)

    plt.text(0.5, -offset, '%' + '$Ca^{2+}$',
             ha='center', va='center', fontsize=12)
    plt.text(1+2*offset+0.5, -offset, '%' + '$Cl^{-}$',
             ha='center', va='center', fontsize=12)
    plt.text(0.25-offset*np.cos(np.pi/30), 0.25*np.tan(np.pi/3)+offset*np.sin(np.pi/30), '%' + '$Mg^{2+}$',
             ha='center', va='center', rotation=60, fontsize=12)
    plt.text(1.75+2*offset+offset*np.cos(np.pi/30), 0.25*np.tan(np.pi/3)+offset*np.sin(np.pi/30), '%' + '$SO_4^{2-}$',
             ha='center', va='center', rotation=-60, fontsize=12)
    plt.text(0.75+offset*np.cos(np.pi/30), 0.25*np.tan(np.pi/3)+offset*np.sin(np.pi/30), '%' + '$Na^+$' + '+%' + '$K^+$',
             ha='center', va='center', rotation=-60, fontsize=12)
    plt.text(1+2*offset+0.25-offset*np.cos(np.pi/30), 0.25*np.tan(np.pi/3)+offset*np.sin(np.pi/30), '%' + '$HCO_3^-$' + '+%' + '$CO_3^{2-}$',
             ha='center', va='center', rotation=60, fontsize=12)

    plt.text(0.5+offset+0.5*offset+offset*np.cos(np.pi/30), h+offset*np.tan(np.pi/3)+0.25*np.tan(np.pi/3)+offset*np.sin(np.pi/30), '%' + '$SO_4^{2-}$' + '+%' + '$Cl^-$',
             ha='center', va='center', rotation=60, fontsize=12)
    plt.text(1.5+offset-0.25+offset*np.cos(np.pi/30), h+offset*np.tan(np.pi/3)+0.25*np.tan(np.pi/3)+offset*np.sin(np.pi/30), '%' + '$Ca^{2+}$' + '+%' + '$Mg^{2+}$',
             ha='center', va='center', rotation=-60, fontsize=12)

    plt.fill([0.25, 0.5, 0.75, 0.25],
             [h/2, 0, h/2, h/2], color=(0.8, 0.8, 0.8), zorder=0)

    plt.fill([1+2*offset+0.25, 1+2*offset+0.5, 1+2*offset+0.75, 1+2*offset+0.25],
             [h/2, 0, h/2, h/2], color=(0.8, 0.8, 0.8), zorder=0)

    plt.fill([0.5+offset+0.25, 0.5+offset+0.25+0.5, 0.5+offset+0.25+0.25, 0.5+offset+0.25],
             [h+offset*np.tan(np.pi/3) - 0.5*np.sin(np.pi/3), h+offset*np.tan(np.pi/3) - 0.5*np.sin(
                 np.pi/3), h+offset*np.tan(np.pi/3), h+offset*np.tan(np.pi/3) - 0.5*np.sin(np.pi/3)],
             color=(0.8, 0.8, 0.8), zorder=0)
    plt.fill([0.5+offset+0.25, 0.5+offset+0.25+0.25, 0.5+offset+0.25+0.5, 0.5+offset+0.25],
             [h+offset*np.tan(np.pi/3) + 0.5*np.sin(np.pi/3), h+offset*np.tan(np.pi/3), h+offset*np.tan(
                 np.pi/3) + 0.5*np.sin(np.pi/3), h+offset*np.tan(np.pi/3) + 0.5*np.sin(np.pi/3)],
             color=(0.8, 0.8, 0.8), zorder=0)

    if unit == 'mg/L':
        gmol = np.array([ions_WEIGHT['Ca'],
                         ions_WEIGHT['Mg'],
                         ions_WEIGHT['Na'],
                         ions_WEIGHT['K'],
                         ions_WEIGHT['HCO3'],
                         ions_WEIGHT['CO3'],
                         ions_WEIGHT['Cl'],
                         ions_WEIGHT['SO4']])

        eqmol = np.array([ions_CHARGE['Ca'],
                          ions_CHARGE['Mg'],
                          ions_CHARGE['Na'],
                          ions_CHARGE['K'],
                          ions_CHARGE['HCO3'],
                          ions_CHARGE['CO3'],
                          ions_CHARGE['Cl'],
                          ions_CHARGE['SO4']])

        tmpdf = df[['Ca', 'Mg', 'Na', 'K', 'HCO3', 'CO3', 'Cl', 'SO4']]
        dat = tmpdf.values

        meqL = (dat / abs(gmol)) * abs(eqmol)

    elif unit == 'meq/L':
        meqL = df[['Ca', 'Mg', 'Na', 'K', 'HCO3', 'CO3', 'Cl', 'SO4']].values

    else:
        raise RuntimeError("""
        Currently only mg/L and meq/L are supported.
        Convert the unit if needed.""")

    sumcat = np.sum(meqL[:, 0:4], axis=1)
    suman = np.sum(meqL[:, 4:8], axis=1)
    cat = np.zeros((meqL.shape[0], 3))
    an = np.zeros((meqL.shape[0], 3))
    cat[:, 0] = meqL[:, 0] / sumcat                  # Ca
    cat[:, 1] = meqL[:, 1] / sumcat                  # Mg
    cat[:, 2] = (meqL[:, 2] + meqL[:, 3]) / sumcat   # Na+K
    an[:, 0] = (meqL[:, 4] + meqL[:, 5]) / suman     # HCO3 + CO3
    an[:, 2] = meqL[:, 6] / suman                    # Cl
    an[:, 1] = meqL[:, 7] / suman                    # SO4

    cat_x = 0.5 * (2 * cat[:, 2] + cat[:, 1])
    cat_y = h * cat[:, 1]
    an_x = 1 + 2 * offset + 0.5 * (2 * an[:, 2] + an[:, 1])
    an_y = h * an[:, 1]
    d_x = an_y / (4 * h) + 0.5 * an_x - cat_y / (4 * h) + 0.5 * cat_x
    d_y = 0.5 * an_y + h * an_x + 0.5 * cat_y - h * cat_x

    Labels = []
    for i in range(len(df)):
        if (df.at[i, 'Label'] in Labels or df.at[i, 'Label'] == ''):
            TmpLabel = ''
        else:
            TmpLabel = df.at[i, 'Label']
            Labels.append(TmpLabel)

        try:
            if (df['Color'].dtype is np.dtype('float')) or \
                    (df['Color'].dtype is np.dtype('int64')):
                vmin = np.min(df['Color'].values)
                vmax = np.max(df['Color'].values)
                cf = plt.scatter(cat_x[i], cat_y[i],
                                 marker=df.at[i, 'Marker'],
                                 s=df.at[i, 'Size'],
                                 c=df.at[i, 'Color'], vmin=vmin, vmax=vmax,
                                 alpha=df.at[i, 'Alpha'],
                                 # label=TmpLabel,
                                 edgecolors='black')
                plt.scatter(an_x[i], an_y[i],
                            marker=df.at[i, 'Marker'],
                            s=df.at[i, 'Size'],
                            c=df.at[i, 'Color'], vmin=vmin, vmax=vmax,
                            alpha=df.at[i, 'Alpha'],
                            label=TmpLabel,
                            edgecolors='black')
                plt.scatter(d_x[i], d_y[i],
                            marker=df.at[i, 'Marker'],
                            s=df.at[i, 'Size'],
                            c=df.at[i, 'Color'], vmin=vmin, vmax=vmax,
                            alpha=df.at[i, 'Alpha'],
                            # label=TmpLabel,
                            edgecolors='black')

            else:
                plt.scatter(cat_x[i], cat_y[i],
                            marker=df.at[i, 'Marker'],
                            s=df.at[i, 'Size'],
                            c=df.at[i, 'Color'],
                            alpha=df.at[i, 'Alpha'],
                            # label=TmpLabel,
                            edgecolors='black')
                plt.scatter(an_x[i], an_y[i],
                            marker=df.at[i, 'Marker'],
                            s=df.at[i, 'Size'],
                            c=df.at[i, 'Color'],
                            alpha=df.at[i, 'Alpha'],
                            label=TmpLabel,
                            edgecolors='black')
                plt.scatter(d_x[i], d_y[i],
                            marker=df.at[i, 'Marker'],
                            s=df.at[i, 'Size'],
                            c=df.at[i, 'Color'],
                            alpha=df.at[i, 'Alpha'],
                            # label=TmpLabel,
                            edgecolors='black')

        except (ValueError):
            pass

    if (df['Color'].dtype is np.dtype('float')) or (df['Color'].dtype is np.dtype('int64')):
        cb = plt.colorbar(cf, extend='both', spacing='uniform',
                          orientation='vertical', fraction=0.025, pad=0.05)
        cb.ax.set_ylabel('$TDS$' + ' ' + '$(mg/L)$',
                         rotation=90, labelpad=-75, fontsize=14)

    plt.legend(bbox_to_anchor=(0.15, 0.875), markerscale=1, fontsize=12,
               frameon=False,
               labelspacing=0.25, handletextpad=0.25)

    cwd = os.getcwd()

    plt.savefig(cwd + '\\src\\resources\\plots\\' + figname + '.' + figformat, format=figformat,
                bbox_inches='tight', dpi=300)

    return


matplotlib.rcParams['lines.markersize'] = 6


def durovPlot(df,
              unit='mg/L',
              figname='Durvo Diagram',
              figformat='jpg'):

    ALLOWED_UNITS = ['mg/L', 'meq/L']
    if unit not in ALLOWED_UNITS:
        raise RuntimeError("""
        Currently only mg/L and meq/L are supported.
        Convert the unit manually if needed.""")

    h = 0.5 * np.tan(np.pi / 3.0)
    ltriangle_x = np.array([0, -h, 0, 0])
    ltriangle_y = np.array([0, 0.5, 1, 0])
    ttriangle_x = np.array([0, 0.5, 1, 0])
    ttriangle_y = np.array([1, 1 + h, 1, 1])

    crectangle_x = np.array([0, 0, 1, 1, 0])
    crectangle_y = np.array([0, 1, 1, 0, 0])

    fig = plt.figure(figsize=(10, 10), dpi=100)
    ax = fig.add_subplot(111, aspect='equal',
                         frameon=False, xticks=[], yticks=[])
    ax.plot(ltriangle_x, ltriangle_y, '-k', lw=1.0)
    ax.plot(ttriangle_x, ttriangle_y, '-k', lw=1.0)
    ax.plot(crectangle_x, crectangle_y, '-k', lw=1.0)

    linterval = 0.1
    ticklabels = ['0', '10', '20', '30', '40', '50',
                  '60', '70', '80', '90', '100']
    ticklength = 0.02

    for i, x in enumerate(np.linspace(-h, 0, int(1 / linterval + 1))):
        ax.plot([x, x + ticklength * np.sin(np.pi / 3.0)],
                [-x * np.tan(np.pi / 6.0), -x * np.tan(np.pi /
                                                       6.0) + ticklength * np.sin(np.pi / 6.0)],
                'k', lw=1.0)
        if i in [0, 2, 4, 6, 8]:
            ax.plot([x, 0], [-x * np.tan(np.pi / 6.0), -
                    x / np.sin(np.pi / 3.0)], 'k:')
            ax.text(x - ticklength * np.sin(np.pi / 3.0), -x * np.tan(np.pi / 6.0) - 4 * ticklength * np.sin(np.pi / 6.0),
                    ticklabels[i], rotation=-30, ha='center', va='center')
    ax.annotate('%' + '$Na^+$' + '+%' + '$K^+$',
                xy=(-0.2, 0.005), xycoords='data',
                ha="left", va="center",
                xytext=(-100, 32), textcoords='offset points',
                size=12, rotation=-30,
                arrowprops=dict(arrowstyle="simple", fc="k", ec="k"))
    ax.text(-h - 0.05, 0.5, '  100% Mg' + '$^{2+}$', rotation=90,
            ha='center', va='center', fontsize=12)

    for i, x in enumerate(np.linspace(-h, 0, int(1 / linterval + 1))):
        ax.plot([x, x + ticklength * np.sin(np.pi / 3.0)],
                [0.5 + (h + x) * np.tan(np.pi / 6.0), 0.5 + (h + x) *
                 np.tan(np.pi / 6.0) - ticklength * np.sin(np.pi / 6.0)],
                'k', lw=1.0)
        if i in [0, 2, 4, 6, 8]:
            ax.plot([x, 0], [0.5 + (h + x) * np.tan(np.pi / 6.0),
                    1 + x / np.sin(np.pi / 3.0)], 'k:')
            ax.text(x - ticklength * np.sin(np.pi / 3.0), 0.5 + (h + x) * np.tan(np.pi / 6.0) + 4 * ticklength * np.sin(np.pi / 6.0),
                    ticklabels[i], rotation=30, ha='center', va='center')
    ax.annotate('%' + '$Ca^{2+}$',
                xy=(-0.3, 1.0), xycoords='data',
                ha="left", va="center",
                xytext=(-68, -28), textcoords='offset points',
                size=12, rotation=30,
                arrowprops=dict(arrowstyle="simple", fc="k", ec="k"))

    for i, x in enumerate(np.linspace(0, 0.5, int(1 / linterval + 1))):
        ax.plot([x, x + ticklength * np.sin(np.pi / 6.0)],
                [1 + x * np.tan(np.pi / 3.0), 1 + x * np.tan(np.pi /
                                                             3.0) - ticklength * np.sin(np.pi / 6.0)],
                'k', lw=1.0)
        if i in [2, 4, 6, 8, 10]:
            ax.plot([x, x / np.sin(np.pi / 6.0)],
                    [1 + x * np.tan(np.pi / 3.0), 1], 'k:')
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
                [1 + (1 - x) * np.tan(np.pi / 3.0), 1 + (1 - x) *
                 np.tan(np.pi / 3.0) - ticklength * np.sin(np.pi / 3.0)],
                'k', lw=1.0)
        if i in [2, 4, 6, 8, 10]:
            ax.plot([x, (x - 0.5) / np.sin(np.pi / 6.0)],
                    [1 + (1 - x) * np.tan(np.pi / 3.0), 1], 'k:')
            ax.text(x + 4 * ticklength * np.sin(np.pi / 6.0), 1 + (1 - x) * np.tan(np.pi / 3.0) + ticklength * np.sin(np.pi / 3.0),
                    ticklabels[i], rotation=-60, ha='center', va='center')
    ax.annotate('$HCO_3^-$' + '+' + '$CO_3^{2-}$',
                xy=(1.17, 1.05), xycoords='data',
                ha="left", va="center",
                xytext=(-78, 70), textcoords='offset points',
                size=12, rotation=-60,
                arrowprops=dict(arrowstyle="simple", fc="k", ec="k"))
    ax.text(0.5, h + 1.05, '  100% SO' + '$_4^{2-}$', rotation=0,
            ha='center', va='center', fontsize=12)

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

    nums = []
    for i in range(3):
        nums.append([])
    for j in range(1, 4):
        nums[i].append(j)

    ax.text(0.15, 0.1, 'NaCl', ha='center', va='center', fontsize=12)
    ax.text(0.8, 0.9, 'CaHCO$_3$', ha='center', va='center', fontsize=12)

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

    cat_x = -np.sin(np.pi / 3.0) * (1 - cat[:, 2] - cat[:, 0])
    cat_y = np.sin(np.pi / 6.0) * (1 - cat[:, 2] - cat[:, 0]) + cat[:, 0]
    an_x = np.sin(np.pi / 6.0) * \
        (1 - an[:, 2]) + np.sin(np.pi / 6.0) * an[:, 0]
    an_y = 1 + np.sin(np.pi / 3.0) * (1 - an[:, 2] - an[:, 0])

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
                        # label=TmpLabel,
                        edgecolors='black')
            plt.scatter(an_x[i], an_y[i],
                        marker=df.at[i, 'Marker'],
                        s=df.at[i, 'Size'],
                        color=df.at[i, 'Color'],
                        alpha=df.at[i, 'Alpha'],
                        # label=TmpLabel,
                        edgecolors='black')
            plt.scatter(an_x[i], cat_y[i],
                        marker=df.at[i, 'Marker'],
                        s=df.at[i, 'Size'],
                        color=df.at[i, 'Color'],
                        alpha=df.at[i, 'Alpha'],
                        label=TmpLabel,
                        edgecolors='black')

        except (ValueError):
            pass

    plt.legend(loc='upper left', markerscale=1, frameon=False, fontsize=12,
               labelspacing=0.25, handletextpad=0.25)

    cwd = os.getcwd()

    plt.savefig(cwd + '\\src\\resources\\plots\\' + figname + '.' + figformat, format=figformat,
                bbox_inches='tight', dpi=300)

    return


def gibbsPlot(df,
              unit='mg/L',
              figname='Gibbs Diagram',
              figformat='jpg'):

    if not {'Na', 'Ca', 'HCO3', 'Cl', 'TDS'}.issubset(df.columns):
        raise RuntimeError("""
        Gibbs diagram uses geochemical parameters Na, Ca, Cl, HCO3, and TDS.
         Confirm that these parameters are provided in the input file.""")

    ALLOWED_UNITS = ['mg/L', 'meq/L']
    if unit not in ALLOWED_UNITS:
        raise RuntimeError("""
        Currently only mg/L and meq/L are supported.
        Convert the unit manually if needed.""")

    Cl_HCO3_plot_wrapped_lines = np.array([
        [0.0056, 0.0251, 0.0446, 0.0771, 0.1096,
         0.1291, 0.1454, 0.1844, 0.2104, 0.2299,
         0.2656, 0.2883, 0.3078, 0.3500, 0.3792,
         0.4052, 0.4507, 0.4799, 0.4994, 0.5351,
         0.5579, 0.5741, 0.5904, 0.6196, 0.6488,
         0.6716, 0.6976, 0.7236, 0.7495, 0.7723,
         0.7983, 0.8242, 0.8535, 0.8827, 0.9119,
         0.9444, 0.9704, 0.9931, 9.9999, 9.9999,
         0.9961, 0.9830, 0.9668, 0.9538, 0.944,
         0.9180, 0.9050, 0.8887, 0.8530, 0.8302,
         0.8074, 0.7814, 0.7554, 0.7294, 0.7132,
         0.6937, 0.6742, 0.6417, 0.6189, 0.5897,
         0.5735, 0.5605, 0.5377, 0.5150, 0.4955,
         0.4760, 0.4565, 0.4402, 0.4175, 0.4013,
         0.3785, 0.3590, 0.3395, 0.3200, 0.3070,
         0.2941, 0.2746, 0.2551, 0.2388, 0.2291,
         0.2128, 0.2063, 0.1998, 0.1997, 0.2062,
         0.2159, 0.2354, 0.2516, 0.2646, 0.2873,
         0.3002, 0.3262, 0.3489, 0.3683, 0.3878,
         0.4105, 0.4267, 0.4527, 0.4754, 0.5175,
         0.5500, 0.5694, 0.5889, 0.6148, 0.6376,
         0.6538, 0.6700, 0.6927, 0.7089, 0.7252,
         0.7479, 0.7771, 0.7965, 0.8160, 0.8322,
         0.8517, 0.8841, 0.9003, 0.9165, 0.9392,
         0.9522, 0.9684, 0.9846, 0.9975, 9.9999,
         9.9999, 0.9935, 0.9870, 0.9708, 0.9579,
         0.9385, 0.9255, 0.9061, 0.8801, 0.8607,
         0.8347, 0.8088, 0.7893, 0.7602, 0.7277,
         0.6855, 0.6531, 0.6044, 0.5623, 0.5298,
         0.4909, 0.4520, 0.4196, 0.3839, 0.3450,
         0.3158, 0.2899, 0.2672, 0.2380, 0.2088,
         0.1861, 0.1634, 0.1408, 0.1148, 0.0889,
         0.0759, 0.0630, 0.0500, 0.0371, 0.0209,
         0.0079],
        [21.4751, 19.1493, 17.0753, 15.2298, 13.0728,
         11.8826, 11.2221, 10.2041, 9.6387, 9.2797,
         8.9368, 8.7709, 8.6076, 8.6146, 8.4558,
         8.2994, 7.8425, 7.6979, 7.4111, 7.0018,
         6.7414, 6.4899, 6.3687, 5.9019, 5.6831,
         5.4718, 5.1686, 4.9767, 4.7919, 4.6137,
         4.5284, 4.4446, 4.3627, 4.2822, 4.2033,
         4.2059, 4.208, 4.1299, 4.1299, 10.1674,
         10.1674, 11.4037, 12.7896, 14.0724, 15.4849,
         17.6996, 19.8518, 21.8417, 24.487, 27.9908,
         30.2081, 33.2299, 35.8599, 38.6981, 40.9758,
         43.3849, 46.8245, 50.5243, 54.5265, 58.8385,
         61.1188, 62.2861, 67.2201, 69.8165, 73.9212,
         76.7813, 81.2954, 84.446, 89.4052, 92.8702,
         96.4574, 102.1283, 104.0659, 110.1841, 114.4615,
         116.6475, 121.1607, 125.8485, 130.7259, 138.4373,
         146.5855, 161.3088, 174.141, 191.656, 219.2029,
         236.7142, 260.6201, 281.4751, 298.2091, 322.1122,
         347.8662, 383.045, 421.755, 455.5326, 482.6745,
         521.3635, 563.0834, 608.2554, 657.0104, 751.9576,
         828.1041, 877.4449, 929.7256, 985.244, 1044.0127,
         1085.1491, 1127.9064, 1195.1847, 1242.2777, 1291.2262,
         1368.2463, 1506.707, 1596.481, 1724.3402, 1826.9677,
         1973.2861, 2258.0322, 2485.9166, 2684.8419, 3013.3769,
         3317.2855, 3582.7378, 3944.3137, 4178.8072, 4178.8072,
         62336.9735, 62336.9735, 56633.1044, 49506.8651, 42458.3638,
         35717.6411, 33073.3075, 28909.8381, 24787.6514, 22513.9619,
         20058.1172, 17870.1583, 16545.0928, 14739.4207, 13643.1016,
         12151.1174, 11247.3165, 9825.9309, 8585.2422, 7795.8054,
         6682.5559, 5839.1344, 5201.5485, 4459.0392, 3822.2836,
         3277.0691, 2919.6032, 2551.907, 2273.401, 1875.816,
         1703.6475, 1460.8193, 1252.6024, 1053.6071, 886.2253,
         805.035, 731.2828, 677.1427, 603.4295, 517.4845,
         452.3967]])

    Na_Ca_plot_wrapped_lines = np.array([
        [0.0083, 0.0277, 0.0505, 0.0668, 0.0830,
         0.1090, 0.1253, 0.1481, 0.1611, 0.1871,
         0.2067, 0.2294, 0.2457, 0.2718, 0.2880,
         0.3174, 0.3500, 0.3956, 0.4379, 0.4802,
         0.5225, 0.5681, 0.6039, 0.6429, 0.6819,
         0.7144, 0.7534, 0.7729, 0.7924, 0.8119,
         0.8314, 0.8509, 0.8737, 0.8997, 0.9225,
         0.9420, 0.9615, 0.9843, 0.9973, 9.9999,
         9.9999, 0.9932, 0.9866, 0.9636, 0.9406,
         0.9209, 0.9045, 0.8881, 0.8716, 0.8519,
         0.8322, 0.8026, 0.7663, 0.7367, 0.7070,
         0.6774, 0.6543, 0.6279, 0.6146, 0.5916,
         0.5783, 0.5617, 0.5419, 0.5383, 0.5513,
         0.5739, 0.6096, 0.6453, 0.6778, 0.6940,
         0.7135, 0.7362, 0.7653, 0.8010, 0.8399,
         0.8724, 0.8983, 0.9340, 0.9469, 0.9696,
         0.9891, 0.9955, 9.9999, 9.9999, 0.9003,
         0.8871, 0.8410, 0.8278, 0.7949, 0.7619,
         0.7290, 0.6830, 0.6369, 0.5942, 0.5516,
         0.5089, 0.4399, 0.4005, 0.3545, 0.3118,
         0.2658, 0.2296, 0.1836, 0.1442, 0.1047,
         0.0718, 0.0454, 0.0092],
        [108.9257, 97.0774, 88.1725, 80.1044, 74.1755,
         66.0907, 61.199, 56.6553, 52.4686, 47.6497,
         44.9668, 40.842, 39.2892, 35.6808, 33.0399,
         30.5792, 28.2983, 24.7192, 21.5954, 18.5101,
         15.5659, 12.5986, 11.0093, 9.0844, 7.3545,
         6.3061, 5.2036, 4.6375, 4.2938, 3.8267,
         3.543, 3.2184, 2.9232, 2.6046, 2.321,
         2.1489, 1.9896, 1.8419, 1.7386, 1.7386,
         7514.32, 7514.32, 7234.9489, 6582.7621, 5989.366,
         5553.6776, 5051.7878, 4683.7185, 4179.9779, 3730.8803,
         3394.141, 2808.0488, 2153.0926, 1714.648, 1365.4861,
         1087.4256, 899.4273, 702.6564, 592.1454, 508.812,
         420.6893, 334.8554, 271.6992, 204.138, 175.1691,
         144.6326, 114.8937, 91.2695, 78.2591, 68.4377,
         59.8414, 50.3607, 39.2599, 30.5983, 22.9525,
         18.2353, 14.4912, 11.7332, 10.262, 8.6362,
         7.5514, 7.267, 7.267, 45278.8769, 45278.8769,
         39640.8983, 28715.7533, 25624.1396, 20408.7169, 15947.8034,
         12461.9512, 9558.8684, 7473.2267, 6069.0146, 5023.5351,
         4238.2048, 3072.823, 2592.1249, 2065.5649, 1614.6797,
         1311.4464, 1044.6506, 816.7192, 650.65, 508.5584,
         412.8464, 341.5145, 261.8588]])

    fig = plt.figure(figsize=(10, 15))

    ax1 = fig.add_subplot(221)
    ax1.semilogy()
    ax1.plot(Na_Ca_plot_wrapped_lines[0], Na_Ca_plot_wrapped_lines[1],
             'k--', lw=1.25)

    Labels = []
    for i in range(len(df)):
        if (df.at[i, 'Label'] in Labels or df.at[i, 'Label'] == ''):
            TmpLabel = ''
        else:
            TmpLabel = df.at[i, 'Label']
            Labels.append(TmpLabel)

        try:
            if unit == 'mg/L':
                x = df.at[i, 'Na'] / ions_WEIGHT['Na'] / \
                    (df.at[i, 'Na'] / ions_WEIGHT['Na'] +
                     df.at[i, 'Ca'] / ions_WEIGHT['Ca'])

            elif unit == 'meq/L':
                x = df.at[i, 'Na'] / ions_WEIGHT['Na'] / ions_CHARGE['Na'] / \
                    (df.at[i, 'Na'] / ions_WEIGHT['Na'] / ions_CHARGE['Na'] +
                     df.at[i, 'Ca'] / ions_WEIGHT['Ca'] / ions_CHARGE['Ca'])

            else:
                raise RuntimeError("""
                Currently only mg/L and meq/L are supported.
                Convert the unit if needed.""")

            y = df.at[i, 'TDS']
            ax1.scatter(x, y,
                        marker=df.at[i, 'Marker'],
                        s=df.at[i, 'Size'],
                        color=df.at[i, 'Color'],
                        alpha=df.at[i, 'Alpha'],
                        label=TmpLabel,
                        edgecolors='black')
        except (ValueError):
            pass

    ax1.set_xlim(0, 1)
    ax1.set_ylim(1, 45000)

    plt.minorticks_on()
    ax1.tick_params(which='major', direction='in', length=4, width=1.25)
    ax1.tick_params(which='minor', direction='in', length=2.5, width=1.25)

    ax1.spines['top'].set_linewidth(1.25)
    ax1.spines['top'].set_color('k')
    ax1.spines['bottom'].set_linewidth(1.25)
    ax1.spines['bottom'].set_color('k')
    ax1.spines['left'].set_linewidth(1.25)
    ax1.spines['left'].set_color('k')
    ax1.spines['right'].set_linewidth(1.25)
    ax1.spines['right'].set_color('k')

    ax1.text(0.775, 5, 'Precipitation \nDominancy', fontname='Times New Roman', ha='left',
             fontsize=8, family='cursive')
    ax1.text(0.025, 155, 'Rock \nDominancy', va='center',
             fontname='Times New Roman', fontsize=8, family='cursive')
    ax1.text(0.725, 10000, 'Evaporation \nDominancy', fontname='Times New Roman', ha='left',
             fontsize=8, family='cursive')

    ax1.set_xlabel('Na$^+$/(Na$^+$+Ca$^{2+}$)', weight='normal',
                   fontsize=12)
    ax1.set_ylabel('TDS (ppm)', weight='normal',
                   fontsize=12)
    labels = ax1.get_xticklabels() + ax1.get_yticklabels()
    [label.set_fontsize(10) for label in labels]

    ax1.legend(loc='upper left', markerscale=1, frameon=False, fontsize=12,
               labelspacing=0.25, handletextpad=0.25)

    ax2 = fig.add_subplot(222)
    ax2.semilogy()
    ax2.plot(Cl_HCO3_plot_wrapped_lines[0], Cl_HCO3_plot_wrapped_lines[1],
             'k--', lw=1.25)

    Labels = []
    for i in range(len(df)):
        if (df.at[i, 'Label'] in Labels or df.at[i, 'Label'] == ''):
            TmpLabel = ''
        else:
            TmpLabel = df.at[i, 'Label']
            Labels.append(TmpLabel)

        try:
            x = df.at[i, 'Cl'] / ions_WEIGHT['Cl'] / \
                (df.at[i, 'Cl'] / ions_WEIGHT['Cl'] +
                 df.at[i, 'HCO3'] / ions_WEIGHT['HCO3'])
            y = df.at[i, 'TDS']
            ax2.scatter(x, y,
                        marker=df.at[i, 'Marker'],
                        s=df.at[i, 'Size'],
                        color=df.at[i, 'Color'],
                        alpha=df.at[i, 'Alpha'],
                        label=TmpLabel,
                        edgecolors='black')
        except (ValueError):
            pass

    ax2.set_xlim(0, 1)
    ax2.set_ylim(1, 45000)

    plt.minorticks_on()
    ax2.tick_params(which='major', direction='in', length=4, width=1.25)
    ax2.tick_params(which='minor', direction='in', length=2.5, width=1.25)
    ax2.spines['top'].set_linewidth(1.25)
    ax2.spines['top'].set_color('k')
    ax2.spines['bottom'].set_linewidth(1.25)
    ax2.spines['bottom'].set_color('k')
    ax2.spines['left'].set_linewidth(1.25)
    ax2.spines['left'].set_color('k')
    ax2.spines['right'].set_linewidth(1.25)
    ax2.spines['right'].set_color('k')

    ax2.text(0.76, 8.5, 'Precipitation \nDominancy', fontname='Times New Roman',
             fontsize=8, family='cursive')
    ax2.text(0.025, 155, 'Rock \nDominancy', va='center',
             fontname='Times New Roman', fontsize=8, family='cursive')
    ax2.text(0.72, 7000, 'Evaporation \nDominancy', fontname='Times New Roman',
             fontsize=8, family='cursive')

    ax2.set_xlabel('Cl$^-$/(Cl$^-$+HCO$_3^-$)',
                   weight='normal', fontsize=12)
    ax2.set_ylabel('TDS (ppm)',
                   fontsize=12, weight='normal')

    labels = ax2.get_xticklabels() + ax2.get_yticklabels()
    [label.set_fontsize(10) for label in labels]

    ax2.legend(loc='upper left', markerscale=1, frameon=False, fontsize=12,
               labelspacing=0.25, handletextpad=0.25)

    cwd = os.getcwd()

    plt.savefig(cwd + '\\src\\resources\\plots\\' + figname + '.' + figformat, format=figformat,
                bbox_inches='tight', dpi=300)

    return


def chadhaPlot(df,
               unit='mg/L',
               figname='Chadha Diagram',
               figformat='jpg'):

    if not {'Ca', 'Mg', 'Na', 'K', 'HCO3', 'CO3', 'Cl', 'SO4'}.issubset(df.columns):
        raise RuntimeError("""
        Chada diagram uses geochemical parameters Ca, Mg, Na, K, HCO3, CO3, Cl, and SO4.
        Confirm that these parameters are provided in the input file.""")

    ALLOWED_UNITS = ['mg/L', 'meq/L']
    if unit not in ALLOWED_UNITS:
        raise RuntimeError("""
        The unit used in df. Currently only mg/L and meq/L are supported. 
        Convert the unit manually if needed.""")

    plt.style.use('default')
    plt.rcParams['font.size'] = 10
    plt.rcParams['axes.labelsize'] = 10
    plt.rcParams['axes.labelweight'] = 'bold'
    plt.rcParams['axes.titlesize'] = 10
    plt.rcParams['xtick.labelsize'] = 10
    plt.rcParams['ytick.labelsize'] = 10
    plt.rcParams['legend.fontsize'] = 10
    plt.rcParams['figure.titlesize'] = 10

    xmin = -100
    xmax = +100
    ymin = -100
    ymax = +100

    plt.figure(figsize=(8, 8))
    ax = plt.subplot(111, aspect='equal')

    ax.spines['left'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['top'].set_visible(False)
    ax.xaxis.set_ticks_position('bottom')
    ax.yaxis.set_ticks_position('left')
    ax.spines['left'].set_position(('data', 0))
    ax.spines['bottom'].set_position(('data', 0))

    plt.plot([xmin, xmax, xmax, xmin, xmin], [ymin, ymin, ymax, ymax, ymin],
             linestyle='-', linewidth=1.5, color='k')

    plt.xticks([-80, -60, -40, -20, 20, 40, 60, 80],
               ['-80', '-60', '-40', '-20', '+20', '+40', '+60', '+80'])
    plt.yticks([-80, -60, -40, -20, 20, 40, 60, 80],
               ['-80', '-60', '-40', '-20', '+20', '+40', '+60', '+80'])

    ax.plot([xmin, xmax], [0, 0], linestyle='-', linewidth=1.0, color='k')
    ax.plot([0, 0], [ymin, ymax], linestyle='-', linewidth=1.0, color='k')

    plt.text(0, ymin * 1.08, '$(Ca^{2+}+Mg^{2+})-(Na^++K^+)$' + '\nMilliequivalent percentage',
             ha='center', va='center', fontsize=12)
    plt.arrow(xmin * 0.7, ymin * 1.05, 0.1 * (xmax - xmin),
              0, fc='k', head_width=2, head_length=4)
    plt.arrow(47, -105, 20, 0, fc='k', head_width=2, head_length=4)

    plt.text(-107.5, 0, 'Milliequivalent percentage\n' + '$(HCO_3^-+CO_3^{2-})-(Cl^-+SO_4^{2-})$',
             ha='center', va='center', fontsize=12, rotation=90)
    plt.arrow(-105, -75, 0, 20, fc='k', head_width=2, head_length=4)
    plt.arrow(-105, 50, 0, 20, fc='k', head_width=2, head_length=4)

    plt.text(50, 0, '1', fontsize=26, color="0.6",
             ha='center', va='center')
    plt.text(-50, 0, '2', fontsize=26, color="0.6",
             ha='center', va='center')
    plt.text(0, 50, '3', fontsize=26, color="0.6",
             ha='center', va='center')
    plt.text(0, -50, '4', fontsize=26, color="0.6",
             ha='center', va='center')
    plt.text(50, 50, '5', fontsize=26, color="0.6",
             ha='center', va='center')
    plt.text(50, -50, '6', fontsize=26, color="0.6",
             ha='center', va='center')
    plt.text(-50, -50, '7', fontsize=26, color="0.6",
             ha='center', va='center')
    plt.text(-50, 50, '8', fontsize=26, color="0.6",
             ha='center', va='center')

    if unit == 'mg/L':
        gmol = np.array([ions_WEIGHT['Ca'],
                         ions_WEIGHT['Mg'],
                         ions_WEIGHT['Na'],
                         ions_WEIGHT['K'],
                         ions_WEIGHT['HCO3'],
                         ions_WEIGHT['CO3'],
                         ions_WEIGHT['Cl'],
                         ions_WEIGHT['SO4']])

        eqmol = np.array([ions_CHARGE['Ca'],
                          ions_CHARGE['Mg'],
                          ions_CHARGE['Na'],
                          ions_CHARGE['K'],
                          ions_CHARGE['HCO3'],
                          ions_CHARGE['CO3'],
                          ions_CHARGE['Cl'],
                          ions_CHARGE['SO4']])

        tmpdf = df[['Ca', 'Mg', 'Na', 'K', 'HCO3', 'CO3', 'Cl', 'SO4']]
        dat = tmpdf.values

        meqL = (dat / abs(gmol)) * abs(eqmol)
    else:
        meqL = df[['Ca', 'Mg', 'Na', 'K', 'HCO3', 'CO3', 'Cl', 'SO4']].values

    sumcat = np.sum(meqL[:, 0:4], axis=1)
    suman = np.sum(meqL[:, 4:], axis=1)
    cat = np.zeros((dat.shape[0], 3))
    an = np.zeros((dat.shape[0], 3))
    cat[:, 0] = meqL[:, 0] / sumcat                  # Ca
    cat[:, 1] = meqL[:, 1] / sumcat                  # Mg
    cat[:, 2] = (meqL[:, 2] + meqL[:, 3]) / sumcat   # Na+K
    an[:, 0] = (meqL[:, 4] + meqL[:, 5]) / suman     # HCO3 + CO3
    an[:, 2] = meqL[:, 6] / suman                    # Cl
    an[:, 1] = meqL[:, 7] / suman                    # SO4

    Labels = []
    for i in range(len(df)):
        if (df.at[i, 'Label'] in Labels or df.at[i, 'Label'] == ''):
            TmpLabel = ''
        else:
            TmpLabel = df.at[i, 'Label']
            Labels.append(TmpLabel)

        try:
            if (df['Color'].dtype is np.dtype('float')) or \
                    (df['Color'].dtype is np.dtype('int64')):
                vmin = np.min(df['Color'].values)
                vmax = np.max(df['Color'].values)
                cf = ax.scatter(100 * (cat[i, 0] + cat[i, 1] - cat[i, 2]),
                                100 * (an[i, 0] - (an[i, 1] + an[i, 2])),
                                marker=df.at[i, 'Marker'],
                                s=df.at[i, 'Size'],
                                c=df.at[i, 'Color'], vmin=vmin, vmax=vmax,
                                alpha=df.at[i, 'Alpha'],
                                label=TmpLabel,
                                edgecolors='black')

            else:
                ax.scatter(100 * (cat[i, 0] + cat[i, 1] - cat[i, 2]),
                           100 * (an[i, 0] - (an[i, 1] + an[i, 2])),
                           marker=df.at[i, 'Marker'],
                           s=df.at[i, 'Size'],
                           color=df.at[i, 'Color'],
                           alpha=df.at[i, 'Alpha'],
                           label=TmpLabel,
                           edgecolors='black')
        except (ValueError):
            pass

    if (df['Color'].dtype is np.dtype('float')) or (df['Color'].dtype is np.dtype('int64')):
        cb = plt.colorbar(cf, extend='both', spacing='uniform',
                          orientation='vertical', fraction=0.025, pad=0.05)
        cb.ax.set_ylabel('$TDS$' + ' ' + '$(mg/L)$',
                         rotation=90, labelpad=-55, fontsize=14)

    ax.legend(bbox_to_anchor=(0.085, 0.95), markerscale=1, fontsize=12,
              frameon=False,
              labelspacing=0.25, handletextpad=0.25)

    cwd = os.getcwd()

    plt.savefig(cwd + '\\src\\resources\\plots\\' + figname + '.' + figformat, format=figformat,
                bbox_inches='tight', dpi=300)

    return


ions_WEIGHT = {'Ca': 40.0780,
               'Mg': 24.3050,
               'K': 39.0983,
               'Na': 22.9898,
               'Cl': 35.4527,
               'SO4': 96.0636,
               'CO3': 60.0092,
               'HCO3': 61.0171}

ions_CHARGE = {'Ca': +2,
               'Mg': +2,
               'K': +1,
               'Na': +1,
               'Cl': -1,
               'SO4': -2,
               'CO3': -2,
               'HCO3': -1, }

"""
-------------------------- APP SERVICES ----------------------------
"""
# Quits Flask on Electron exit


@ app.route("/quit")
def quit():
    shutdown = request.environ.get("werkzeug.server.shutdown")
    shutdown()

    return


if __name__ == "__main__":
    app.run(**app_config)
