# **Robotics**

<span class="subtitle">
Fall 2025 | Author: Brandon Y. Yang
</span>

---

## Basics

Matrix Group $SO(n)$:
$$
\begin{equation} \label{eq:so_n}
SO(n) = \{\, R \in \mathbb{R}^{n \times n} \mid R^T R = I,\ \det(R) = 1 \,\}
\end{equation}
$$
Properties of $R \in SO(n)$:
$$
\begin{aligned}
& R^{-1} \in SO(n) \\
& R^{-1} = R^T \\
& R^T R = I \\
& \text{The columns (and therefore the rows) of $R$ are mutually orthogonal} \\
& \text{Each column (and therefore each row) of $R$ is a unit vector} \\
& \det(R) = 1
\end{aligned}
$$

We have the following properties of $SO(3)$:
$$
\begin{align}
\sum_i r_{i j}^2 & =1, \quad j \in\{1,2,3\} \label{eq:so3_property1} \\
r_{1 i} r_{1 j}+r_{2 i} r_{2 j}+r_{3 i} r_{3 j} & =0, \quad i \neq j \label{eq:so3_property2}
\end{align}
$$

### Frames and Vectors

A frame $o_i$ is defined by a point $o_i$ (its origin) and a set of orthogonal unit vectors $(x_i, y_i)$ in 2D or $(x_i, y_i, z_i)$ in 3D. The frame serves as a coordinate reference for representing positions and vectors.

A position vector $p^i$ represents the coordinates of a point with respect to frame $o_i$.
For example,
$$
p^0 = \left[\begin{array}{l}
5 \\
6
\end{array}\right]
$$
is the position of $p$ in frame $o_0$. A vector $v^i$ represents a quantity (e.g., displacement, velocity, or force) expressed in the coordinates of frame $o_i$.
For example,
$$
v^0 = \left[\begin{array}{l}
1 \\
2
\end{array}\right]
$$
is a vector expressed with respect to frame $o_0$. Similarly,
$$
o_1^0 = \left[\begin{array}{l}
2 \\
3
\end{array}\right]
$$
represents the position of the origin $o_1$ (of frame $o_1$) expressed in the coordinates of frame $o_0$.

Two vectors can be added or subtracted only if they are expressed in the same frame. Therefore, to add or subtract vectors expressed in different frames, we must first transform one vector into the frame of the other.

### Rotation Matrices

A rotation matrix $R^i_j$ expresses the orientation of frame $o_j$ with respect to frame $o_i$. For example, in 2D, the rotation matrix of frame $o_1$ with respect to frame $o_0$ is given by
$$
R^0_1 = \left[x^0_1 \mid  y^0_1 \right],
$$
where $x^0_1$ and $y^0_1$ are the coordinates in frame $o_0$ of the unit vectors $x_1$ and $y_1$.

<img src="https://branyang02.github.io/images/2d_rotation_matrix.png"
     alt="placeholder"
     style="
       display: block;
       max-width: 500px;
       max-height: 500px;
       width: 100%;
       height: auto;
     ">

Based on the figure above, we can see that
$$
x_1^0=\left[\begin{array}{c}
\cos \theta \\
\sin \theta
\end{array}\right], \quad y_1^0=\left[\begin{array}{r}
-\sin \theta \\
\cos \theta
\end{array}\right]
$$
which gives us
$$
\begin{equation} \label{eq:rotation_matrix_2d}
R_1^0=\left[\begin{array}{cc}
\cos \theta & -\sin \theta \\
\sin \theta & \cos \theta
\end{array}\right].
\end{equation}
$$
Alternatively, we can derive the rotation matrix by projecting the unit vectors of frame $o_1$ onto the unit vectors of frame $o_0$:
$$
x_1^0=\left[\begin{array}{l}
x_1 \cdot x_0 \\
x_1 \cdot y_0
\end{array}\right], \quad y_1^0=\left[\begin{array}{l}
y_1 \cdot x_0 \\
y_1 \cdot y_0
\end{array}\right]
$$
which also gives us
$$
R_1^0=\left[\begin{array}{cc}
x_1 \cdot x_0 & y_1 \cdot x_0 \\
x_1 \cdot y_0 & y_1 \cdot y_0
\end{array}\right].
$$
Rotation matrics belong to the special orthogonal group $SO(n)$ and therefore have the properties listed in $\eqref{eq:so_n}$.

Similarly, in 3D, each axis of frame $o_1$ is projected onto each axis of frame $o_0$ to form the rotation matrix
$$
R_1^0=\left[\begin{array}{ccc}
x_1 \cdot x_0 & y_1 \cdot x_0 & z_1 \cdot x_0 \\
x_1 \cdot y_0 & y_1 \cdot y_0 & z_1 \cdot y_0 \\
x_1 \cdot z_0 & y_1 \cdot z_0 & z_1 \cdot z_0
\end{array}\right].
$$
We have the following **basic rotation matrices** in 3D:
$$
\begin{align}
R_{z, \theta}&=\left[\begin{array}{ccc}
\cos \theta & -\sin \theta & 0 \\
\sin \theta & \cos \theta & 0 \\
0 & 0 & 1
\end{array}\right] \label{eq:basic_rotation_matrices_z} \\
R_{x, \theta}&=\left[\begin{array}{ccc}
1 & 0 & 0 \\
0 & \cos \theta & -\sin \theta \\
0 & \sin \theta & \cos \theta
\end{array}\right] \label{eq:basic_rotation_matrices_x} \\
R_{y, \theta}&=\left[\begin{array}{ccc}
\cos \theta & 0 & \sin \theta \\
0 & 1 & 0 \\
-\sin \theta & 0 & \cos \theta
\end{array}\right] \label{eq:basic_rotation_matrices_y}
\end{align}
$$
In this notation, $R_{z, \theta}$ represents a rotation of $\theta$ radians about the $z$-axis, and the same applies for $R_{y, \theta}$ and $R_{x, \theta}$.

Rotation matrices can also be used to transform the coordinates of a point from one frame to another. If a given point is expressed relative to $o_1$ by coordinates $p^1$, then $R^0_1p^1$ represents
the same point expressed relative to the frame $o_0$. Similarly, to transform a vector $v^1$ expressed in frame $o_1$ to frame $o_0$, we compute $v^0 = R^0_1 v^1$.

#### Composition of Rotations

We have the following property for composition of rotations:
$$
R^0_2 = R^0_1 R^1_2
$$
This means we can transform a vector from frame $o_2$ to frame $o_0$ by first transforming it to frame $o_1$ and then to frame $o_0$:
$$
v^0 = R^0_2 v^2 = R^0_1 R^1_2 v^2
$$
We can summarize the rule of composition of rotational transformations by the following recipe. Given a fixed frame $o_0$ and current frame $o_1$, together with rotation matrix $R_1^0$ relating them, if a third frame $o_2$ is obtained by a rotation $R$ performed relative to the _current frame_ then **postmultiply** $R_1^0$ by $R=R_2^1$ to obtain
$$
R_2^0=R_1^0 R_2^1.
$$
If the second rotation is to be performed relative to the fixed frame then it is both confusing and inappropriate to use the notation $R_2^1$ to represent this rotation. Therefore, if we represent the rotation by $R$, we **premultiply** $R_1^0$ by $R$ to obtain
$$
R_2^0=R R_1^0.
$$
