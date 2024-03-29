# 高等数学（工本）

## 空间解析几何与向量代数

### 距离公式

$$
\begin{align}
|P_1P_2|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}
\end{align}
$$

### 加法

$$
\begin{align}
\overrightarrow{OA}+\overrightarrow{OB}=\overrightarrow{OC} \\
\overrightarrow{OA}+\overrightarrow{AC}=\overrightarrow{OC} \\
\overrightarrow{OA}-\overrightarrow{OB}=\overrightarrow{BA}
\end{align}
$$

### 向量坐标

$$
\overrightarrow{M_1M_2}=\{(x_2-x_1),(y_2-y_1),(z_2-z_1)\} \\
\alpha=\{a1,a2,a3\},\beta=\{b1,b2,b3\} \\
若\alpha // \beta，则\frac{a1}{b1}=\frac{a2}{b2}=\frac{a3}{b3}
$$

### 数量积

$$
\alpha \cdot \beta=|\alpha| |\beta| \cos\varphi \\
若 \alpha 与 \beta垂直，则\alpha \cdot \beta=0
$$

#### 数量积的坐标表示

$$
\begin{align}
\alpha=\{a1,a2,a3\},\beta=\{b1,b2,b3\} \\
\alpha \cdot \beta=a_1b_1+a_2b_2+a_3b_3
\end{align}
$$

### 平面方程

#### 点法式

$$
\begin{align}
\text{点}P_0(x_0,y_0,z_0),\text{非零向量}n=\{A,B,C\} \\
n \cdot \overrightarrow{P_0P}=0 \\
A(x-x_0)+B(y-y_0)+C(z-z_0)-0
\end{align}
$$

#### 一般方程

$$
Ax+By+Cz+D=0
$$

#### 截距式方程

$$
\frac{x}{a}+\frac{y}{b}+\frac{z}{c}=1
$$

#### 两个平面夹角

$$
\begin{align}
n_1=\{A_1,B_1,C_1\},n_2=\{A_2,B_2,C_2\} \\
\cos\theta=\frac{n_1 \cdot n_2}{|n_1||n_2|}=\frac{|A_1A_2+B_1B_2+C_1C_2|}{\sqrt{A_1^2+B_1^2+C_1^2}\sqrt{A_2^2+B_2^2+C_2^2}}
\end{align}
$$

#### 点到平面距离

$$
d=\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}
$$

### 直线方程

#### 对称式方程

$$
\frac{x-x_0}{l}=\frac{y-y_0}{m}=\frac{z-z_0}{n}
$$

#### 参数方程

$$
\begin{align}
    & \frac{x-x_0}{l}=\frac{y-y_0}{m}=\frac{z-z_0}{n} \\
    & \begin{cases}
    x=x_0+lt,\\
    y=y_0+mt,\\
    z=z_0+nt,\\
    \end{cases}
\end{align}
$$

#### 一般方程

$$
\begin{cases}
A_1x+B_1y+C_1z+D_1=0,\\
A_2x+B_2y+C_2z+D_2=0,
\end{cases}
$$

#### 直线的夹角

$$
\begin{align}
v_1=\{l_1,m_1,n_1\},v_2=\{l_2,m_2,n_2\} \\
\cos\theta=\frac{v_1 \cdot v_2}{|v_1||v_2|}=\frac{|l_1l_2+m_1m_2+n_1n_2|}{\sqrt{l_1^2+m_1^2+n_1^2}\sqrt{l_2^2+m_2^2+n_2^2}}
\end{align}
$$

### 直线与平面夹角

$$
\begin{align}
v=\{l,m,n\},n=\{A,B,C\} \\
\sin\theta=\frac{v \cdot n}{|v||n|}=\frac{|lA+mB+nC|}{\sqrt{l^2+m^2+n^2}\sqrt{A^2+B^2+C^2}}
\end{align}
$$

## 多元函数的微分学

### 偏导数

$$
\begin{align}
\lim_{\Delta x \to 0}\frac{\Delta F}{\Delta x}=\lim_{\Delta x \to 0}\frac{f(x_0+\Delta x,y_0)-f(x_0,y_0)}{\Delta x}
\end{align}
$$

### 全微分

$$
dz=f_x(x,y)dx+f_y(x,y)dy
$$

### 复合函数偏导数

$$
\frac{dz}{dx}=\frac{\partial z}{\partial u}\cdot\frac{du}{dx}+\frac{\partial z}{\partial v}\cdot\frac{dv}{dx}
$$

### 隐函数偏导数

$$
\frac{dy}{dx}=-\frac{F_x}{F_y}
$$

### 偏导数应用

#### 无条件极值

##### 1. 解方程组

$$
\begin{cases}
    f_x(x,y)=0 \\
    f_y(x,y)=0
    \end{cases}
$$

求出$f(x,y)$的全部驻点

##### 2. 对每个驻点计算

$$
A=f_{xx}(x_0,y_0),B=f_{xy}(x_0,y_0),C=f_{yy}(x_0,y_0),\Delta=B^2-AC
$$

##### 3. 判断

1. $\Delta<0$,点$(x_0,y_0)$是函数$f(x,y)$的极值点，当$A<0$时，$f(x_0,y_0)$是极大值，当$A>0$时，$f(x_0,y_0)$是极小值
2. $\Delta>0$,点$(x_0,y_0)$不是函数$f(x,y)$的极值点
3. $\Delta=0$,不能判断

#### 条件极值

##### 1. 构造拉格朗日函数

$$
L(x,y)=f(x,y)+\lambda\varphi(x,y)
$$

##### 2. 解方程组

$$
\begin{cases}
\frac{\partial L}{\partial x} & =f_x(x,y)+\lambda\varphi_x(x,y)=0 \\
\frac{\partial L}{\partial y} & =f_y(x,y)+\lambda\varphi_y(x,y)=0 \\
\varphi(x,y) & =0
\end{cases}
$$

#### 空间曲线的切线与法平

$$
空间区线 L：\begin{cases}x=x(t) \\ y=y(t) \\ z=z(t)\end{cases}，L 上的点P_0(x_0,y_0,z_0) \\
L 在P_0的切向量为：\{x'(t_0),y'(t_0),z'(t_0)\}
$$

##### 切线方程

$$
\frac{x-x_0}{x'(t_0)}=\frac{y-y_0}{y'(t_0)}=\frac{z-z_0}{z'(t_0)}
$$

##### 法平面方程

$$
x'(t_0)(x-x_0)+y'(t_0)(y-y_0)+z'(t_0)(z-z_0)=0
$$

#### 空间曲面的切平面与法线

$$
曲面\Sigma 的方程 F(x,y,z)=0，\Sigma上的点P_0(x_0,y_0,z_0) \\
\Sigma在P_0上的法向量：\{F_x(x_0,y_0,z_0),F_y(x_0,y_0,z_0),F_z(x_0,y_0,z_0)\}
$$

##### 法线方程

$$
\frac{x-x_0}{F_x(x_0,y_0,z_0)}=\frac{y-y_0}{F_y(x_0,y_0,z_0)}=\frac{z-z_0}{F_y(x_0,y_0,z_0)}
$$

##### 切平面方程

$$
F_x(x_0,y_0,z_0)(x-x_0)+F_y(x_0,y_0,z_0)(y-y_0)+F_z(x_0,y_0,z_0)(z-z_0)=0
$$

#### 方向导数

$$
\frac{\partial z}{\partial l}=\frac{\partial z}{\partial x}\cos\alpha+\frac{\partial z}{\partial y}\cos\beta
$$

#### 梯度

$$
gradf(x_0,y_0)=f_x(x_0,y_0)i+f_y(x_0,y_0)i=\{f_x(x_0,y_0),f_y(x_0,y_0)\}
$$

## 重积分

### 二重积分性质

#### 性质一

$$
\mathop{\iint}_Dkf(x,y)d\sigma=k\mathop{\iint}_Df(x,y)d\sigma
$$

#### 性质二

$$
\mathop{\iint}_D(f(x,y) \pm g(x,y))d\sigma=\mathop{\iint}_Df(x,y)d\sigma \pm \mathop{\iint}_Dg(x,y)d\sigma \\
\mathop{\iint}_D(af(x,y) \pm bg(x,y))d\sigma=a\mathop{\iint}_Df(x,y)d\sigma \pm b\mathop{\iint}_Dg(x,y)d\sigma
$$

#### 性质三

$$
\mathop{\iint}_D f(x,y)d\sigma=\mathop{\iint}_{D_1}f(x,y)d\sigma+\mathop{\iint}_{D_2}f(x,y)d\sigma
$$

#### 性质四

$$
若 f(x,y) \geq g(x,y) \\
则 \mathop{\iint}_D f(x,y)d\sigma \geq \mathop{\iint}_D g(x,y)d\sigma
$$

$$
|\mathop{\iint}_D f(x,y)d\sigma| \leq \mathop{\iint}_D |f(x,y)|d\sigma
$$

#### 性质五

$$
若 m \leq f(x,y) \leq M \\
则 m|D| \leq \mathop{\iint}_D f(x,y)d\sigma \leq M|D| \quad (|D|表示区域D的面积)
$$

#### 性质六

$$
\mathop{\iint}_D f(x,y)d\sigma = f(\xi,\eta)|D| \\
当f(x,y)=1时，有\mathop{\iint}_D f(x,y)d\sigma=\mathop{\iint}_D 1d\sigma =\mathop{\iint}_D d\sigma = |D|
$$

#### 直角坐标下的二重积分

$$
\begin{array}{lcl}
    \begin{array}{lcl}
        D & &\text{有界闭区域,积分区域}\\
        \Delta_{\sigma_i}& &\text{第i个小闭区域} \\
        \lambda & &\text{所有小闭区域中直径最大的值} \\
        f(x,y),g(x,y)& &\text{定义在D上的有界函数,被积函数} \\
        \sigma & &\text{D的面积} \\
        d\sigma , dx dy& &\text{直角坐标系中的微元面积} \\
        \alpha , \beta & &\text{常数} \\
        m,M & &\text{在D上f(x,y)的最小值和最大值}
    \end{array}\\
    \iint_Df(x,y)d\sigma =\mathop{ lim }\limits_{ \lambda  \to 0}\mathop{ \sum }\limits_{i=1}^{n}f(\xi_i,\eta_i) \Delta \sigma_i\\
    \mathop{\iint}\limits_{D}f(x,y)dxdy=\int_{a}^{b}[\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)dy]dx \\
    \mathop{\iint}\limits_{D}f(x,y)dxdy=\int_a^bdx\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)dy \\
\end{array}
$$

##### 奇偶性

设积分区域 D 关于 y 轴对称，$D=D_\text{左}+D_\text{右}$

1. 若被积函数 f(x,y)是关于 x 的奇函数，即$f(-x,y)=-f(x,y)$,则$I=\mathop{\iint}\limits_{D}f(x,y)dxdy=0$
2. 若被积函数 f(x,y)是关于 x 的偶函数，即$f(-x,y)=f(-x,y)$,则$I=\mathop{\iint}\limits_{D}f(x,y)dxdy=2\mathop{\iint}\limits_{D_\text{左}}f(x,y)dxdy=2\mathop{\iint}\limits_{D_\text{右}}f(x,y)dxdy$

#### 极坐标下的二重积分

$$
\mathop{\iint}\limits_{D}f(x,y)dxdy=\mathop{\iint}\limits_{D}f(r\cos\theta,r\sin\theta)rdrd\theta=\int_\alpha^\beta d\theta \int_{\varphi_1(\theta)}^{\varphi_2(\theta)} f(r\cos\theta,r\sin\theta)rdr
$$

### 三重积分

#### 直角坐标

$$
\begin{array}{lcl}
    \begin{array}{lcl}
        \Omega & &\text{空间有界闭区域,积分区域} \\
        \Delta{\upsilon_i} & &\text{第i个小闭区域} \\
        f(x,y,z) & &\text{定义在} \Omega \text{上的有界函数,被积函数} \\
        \upsilon & &\Omega \text{的体积} \\
        d\upsilon , dxdydz & &\text{直角坐标系中的微元面积}
    \end{array} \\
    \mathop{\iiint}\limits_{\Omega}f(x,y,z) d\upsilon = \mathop{\lim}\limits_{ \lambda  \to 0}\mathop{\sum}\limits_{i=1}^nf(\xi_i,\eta_i,\zeta_i)\Delta  \upsilon \\
    \mathop{\iiint}\limits_{\Omega}f(x,y,z)dxdydz =\int_a^b(\int_{\varphi_1(x)}^{\varphi_2(x)}(\int_{z_1(x,y)}^{z_2(x,y)}f(x,y)dz)dy)dx \\
    \mathop{\iiint}\limits_{\Omega}f(x,y,z)dxdydz=\mathop{\iint}\limits_{D_{xy}}dxdy\int_{z_1(x,y)}^{z_2(x,y)}f(x,y,z)dz \\
    \mathop{\iiint}\limits_{\Omega}f(x,y,z)dxdydz=\int_a^bdx\int_{y_1(x)}^{y_2(x)}dy\int_{z_1(x,y)}^{z_2(x,y)}f(x,y,z)dz
    \end{array}
$$

##### 奇偶性

#### 柱面坐标

$$
\begin{align}
  & \begin{cases}
  x=r\cos\theta \\
  y=r\sin\theta \\
  z=z
  \end{cases} \\
\mathop{\iiint}\limits_{\Omega}f(x,y,z)dv & = \mathop{\iiint}\limits_{\Omega}f(r\cos\theta,r\sin\theta,z)rdrd\theta dz \\
& = \mathop{\iint}\limits_Ddxdy\int_{z_1(x,y)}^{z_2(x,y)}f(x,y,z)dz \\
& = \mathop{\iint}\limits_Ddrd\theta\int_{\mathop{z_1}\limits^{\sim}(x,y)}^{\mathop{z_2}\limits^{\sim}(x,y)}f(r\cos\theta,r\sin\theta,z)rdz \\
\end{align}
$$

## 曲线积分与曲面积分

### 对弧长的曲线积分

$$
\begin{cases}
x=\psi(t),  \\
y=\varphi(t)
\end{cases}\,\,\,\,\,\,\alpha \leq t \leq \beta
$$

$$
\int_Lf(x,y)\,ds=\int_{\alpha}^{\beta}f(\psi(t),\varphi(t))\sqrt{(\psi'(t))^2+\varphi'(t)}dt
$$

#### 极坐标

$$
L:r=r(\theta),\theta_0 \leq \theta \leq \theta_1 \\
\begin{cases}
x=r(\theta)\cos\theta \\
y=r(\theta)\sin\theta
\end{cases} (\theta_0 \leq \theta \leq \theta_1) \\
ds=\sqrt{(x^{'}(\theta))^2+(y^{'}(\theta))^2}d\theta \\
\int_Lf(x,y)ds=\int_{\theta_0}^{\theta_1}f(r(\theta)\cos\theta,r(\theta)\sin\theta)\sqrt{r^2(\theta)+(r^{'}(\theta))^2}d\theta
$$

### 对坐标的曲线积分

$$
\begin{cases}
x=\psi(t),\\
y=\varphi(t),\\
dx=\psi'(t)dt,\\
dy=\varphi'(t)dt
\end{cases}
$$

$$
\int_{L_{AB}}=P(x,y)dx+Q(x,y)dy=\int_{\alpha}^{\beta}(P(\psi(t),\varphi(t))\psi'(t)+Q(\psi(t),\varphi(t))\varphi'(t))dt
$$

### 格林公式

$$
\iint_D(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y})dxdy=\oint_L Pdx+Qdy
$$

### 对面积的曲面积分

$$
\underset{\Sigma}{\iint}f(x,y,z)dS= \underset{D_{xy}}{\iint}f(x,y,z(x,y))\sqrt{1+z_x^2+z_y^2}dxdy
$$

### 对坐标的曲面积分

$$
\underset{\Sigma}{\iint}R(x,y,z)dxdy=\begin{cases}
+\underset{D_{xy}}{\iint}R(x,y,z(x,y))dxdy,& \text{若在}\Sigma\text{上恒有}0\leq\gamma<\frac{\pi}{2}(\text{上侧})\\
-\underset{D_{xy}}{\iint}R(x,y,z(x,y))dxdy,& \text{若在}\Sigma\text{上恒有}\frac{\pi}{2}<\gamma\leq{\pi}(\text{下侧})\\
0,& \text{若在}\Sigma\text{上恒有}\gamma=\frac{\pi}{2}
\end{cases}
$$

## 常微分方程

### 一阶微分方程

#### 可分离变量的微分方程

$$
\begin{align}
& \frac{dy}{dx}=f(x)g(y) \\
& \frac{dy}{g(y)}=f(x)dx
\end{align}
$$

#### 齐次方程

$$
\frac{dy}{dx}=f(x,y) \\
\frac{dy}{dx}=\varphi(\frac{y}{x}) \\
令u=\frac{y}{x},则y=xu,\frac{dy}{dx}=u+x\frac{du}{dx} \\
u+x\frac{du}{dx}=\varphi(u) \\
x\frac{du}{dx}=\varphi(u) -u \\
$$

#### 一阶线性微分方程

$$
\begin{align}
& \frac{dy}{dx}+P(x)y=Q(x) \\
& y=(\int Q(x)e^{\int P(x)dx}dx+C)e^{-\int P(x)dx}
\end{align}
$$

### 可降阶的二阶微分方程

#### y''=f(x)

求两次积分

### 二阶线性微分方程

#### 齐次

$$
y''=p(x)y'=q(x)y=f(x)
$$

#### 非齐次

$$
y=\overline{y}(x)+y^*(x)
$$

### 二阶常系数线性微分方程

$$
y''+py'+qy=0 \\
r^2+pr+q=0
$$

$$
\begin{align}
& y=C_1e^{r_1x}+C_2e^{r_2x} \\
& y=e^{ax}(C_1cos \beta x+ C_2sin \beta x) \\
& y=(C_1+C_2x)e^{rx}
\end{align}
$$

## 无穷级数

### 数项级数的概率

$$
s_n=\sum_{k=1}^n u_k =u_1+u_2+u_3+\cdots+u_n \\
若存在常数s使得:s=\lim_{}s_n，则称该级数收敛，否则发散
$$

### 数项级数的基本性质

#### 性质一

$$
\sum_{n=1}^\infty u_n 和 \sum_{n=1}^\infty Cu_n都收敛,则 \\
\sum_{n=1}^\infty Cu_n=C\sum_{n=1}^\infty u_n
$$

#### 性质二

$$
\sum_{n=1}^\infty u_n,\sum_{n=1}^\infty v_n分别收敛于和s,\sigma,则 \\
\sum_{n=1}^\infty (u_n \pm v_n)也收敛于和s\pm\sigma
$$

#### 性质三

在级数中去掉、增加或改变有限项，其敛散性不变

#### 性质四

$$
若\sum_{n=1}^\infty u_n收敛，则对这个级数的项任意加括号所得的新级数 \\
(u_1+\cdots+u_{n_1})+(u_{n_1+1}+\cdots+u_{n_2})+\cdots+(u_{n_{k-1}+1}+\cdots+u_{n_k})+\cdots \\
也收敛，且其和不变
$$

#### 性质五（收敛的必要条件）

$$
若\sum_{n=1}^\infty u_n收敛,则必有\lim_{n \to \infty}u_n=0
$$

### 常见级数

#### 调和级数

$$
\sum_{n=1}^\infty \frac{1}{n} 发散
$$

#### P 级数

$$
\sum_{n=1}^\infty \frac{1}{n^p} (p>0) \\
p>1时收敛，0<p\leq1时发散
$$

#### 交错级数

$$
\sum_{n=1}^\infty (-1)^{n-1}u_n 和 \sum_{n=1}^\infty (-1)^nu_n 为交错级数，两者敛散性相同
$$

### 绝对收敛和条件收敛

$$
若\sum_{n=1}^\infty |u_n| 收敛，则称\sum_{n=1}^\infty u_n绝对收敛 \\
若\sum_{n=1}^\infty u_n 收敛,而\sum_{n=1}^\infty |u_n| 发散，则称\sum_{n=1}^\infty u_n条件收敛
$$

### 审敛法

#### 定理 1

$$
正项级数\sum_{n=1}^\infty u_n收敛的充要条件是:它的部分和数列\{s_n\}有上界
$$

#### 定理 2（比较审敛法）

$$
设\sum_{n=1}^\infty u_n 和 \sum_{n=1}^\infty v_n 都是正项级数，且u_n \leq v_n (n=1,2,\cdots) \\
若\sum_{n=1}^\infty v_n收敛，则\sum_{n=1}^\infty u_n收敛 \quad (大的收敛，小的也收敛) \\
若\sum_{n=1}^\infty u_n发散，则\sum_{n=1}^\infty v_n发散 \quad (小的发散，大的也发散)
$$

#### 定理 3（比较审敛法的极限形式）

$$
设\lim_{n \to \infty}\frac{u_n}{v_n}=l 和 \sum_{n=1}^\infty v_n 都是正项级数 \\
如果\lim_{n \to \infty}\frac{u_n}{v_n}=l \quad (0<l<+\infty) \\
则\sum_{n=1}^\infty u_n 和 \sum_{n=1}^\infty v_n同收敛或同发散
$$

#### 定理 4【比值审敛法，达朗贝尔（D'Alembert）审敛法】

$$
有正项级数\sum_{n=1}^\infty u_n,若\lim_{n \to \infty}\frac{u_{n+1}}{u_n}=\rho \\
则当 \rho < 1，该级数收敛，当\rho>1，该级数发散，当\rho=1时，不能判断
$$

#### 定理 5【根值审敛法，柯西（Cauchy）审敛法】

$$
有正项级数\sum_{n=1}^\infty u_n,若\lim_{n \to \infty}\sqrt[n]{u_n}=\rho \\
则当\rho<1，该级数收敛，当\rho>1，该级数发散，当\rho=1时，不能判断
$$

#### 定理 6（布莱尼茨审敛法）

$$
若交错级数\sum_{n=1}^\infty (-1)^{n-1}u_n满足: \\

1. 数列\{u_n\}单调递减，对于一切正整数n,都有u_n\geq u_{n+1} \\
2. \lim_{n \to \infty}u_n=0 \\
则该级数收敛，且其和\leq u_1
$$

#### 定理 7

$$
若级数\sum_{n=1}^\infty u_n绝对收敛，则级数\sum_{n=1}^\infty u_n必收敛
$$

$$
\begin{align}
& 1 \\
\end{align}
$$

​
