# 基本运算

## 求导公式

### 基本求导

$$
\begin{array}{lcl}
& C'=0 \\
& (x^n)'=nx^{n-1} \\
& (sin x)'=cosx \\
& (cosx)'=-sinx \\
& (tanx)'=sec^2x \\
& (cotx)'=-csc^2x \\
& (arcsinx)'=\frac{1}{\sqrt{1-x^2}} \\
& (arccosx)'=-\frac{1}{\sqrt{1-x^2}} \\
& (arctanx)'=\frac{1}{1+x^2} \\
& (arccotx)'=-\frac{1}{1+x^2} \\
& (e^x)'=e^x \\
& (a^x)'=a^xlna \\
& (lnx)'=\frac{1}{x} \\
& (log_ax)'=\frac{1}{xlna} \\
\end{array}
$$

### 四则运算

$$
\begin{array}{lcl}
& (u(x)\pm v(x))'=u'(x)\pm v'(x) \\
& (u(x)v(x))'=u'(x)v(x)+u(x)v'(x) \\
& (\frac{u(x)}{v(x)})'=\frac{u'(x)v(x)-u(x)v'(x)}{v^2(x)}
\end{array}
$$

### 反函数

$$
f'(x)=\lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}=\lim_{\Delta x \to 0}\frac{1}{\frac{\Delta x}{\Delta y}}=\frac{1}{\lim_{\Delta y \to 0}}{\frac{\Delta x}{\Delta y}}=\frac{1}{\varphi'(x)}
$$

例：

$$
y'=(arcsinx)'=\frac{1}{(\sin y)'}=\frac{1}{\cos y}=\frac{1}{\sqrt{1-\sin^2y}}=\frac{1}{\sqrt{1-x^2}}
$$

### 复合函数

$$
\frac{dy}{dx}=\frac{dy}{du}\times\frac{du}{dx}
$$

### 幂指函数

$$
\begin{array}{lcl}
y=u(x)^{v(x)} \\
y'=u(x)^{v(x)}(v'(x)\ln u(x)+\frac{v(x)}{u(x)}u'(x))
\end{array}
$$

### 隐函数

$$
\begin{array}{lcl}
\sin xy-\ln (x+y)=0 \\
\cos xy \times(1\times y+xy')-\frac{1}{x+y}(1+y')=0
\end{array}
$$

### 参数式方程

$$
\begin{cases}
x=e^t\cos t, \\
y=e^t\sin t
\end{cases}
$$

$$
\frac{dy}{dx}=\frac{\frac{dy}{dt}}{\frac{dx}{dt}}
$$

## 微积分

$$
\begin{array}{lcl}
\int k dx=kx+C \\
\int x^{\mu} dx=\frac{x^{\mu +1}}{ \mu +1}+C,(\mu  \neq -1) \\
\int \frac{1}{x} dx= \ln x+C \\
\int \frac{1}{1+x^2} dx= \arctan x+C \\
\int \frac{1}{\sqrt{1-x^2}} dx= \arcsin x+C
\end{array}
$$
