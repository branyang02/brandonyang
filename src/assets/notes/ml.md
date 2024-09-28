# **Machine Learning**

<span class="subtitle">
Fall 2024 | Author: Brandon Yang
</span>

## Introduction

Machine learning is a field of artificial intelligence that focuses on developing algorithms and models that can learn from data to make predictions and decisions. Machine learning algorithms can be broadly categorized into three types:

1. **Supervised Learning**: Algorithms learn from labeled data to predict outcomes or recognize patterns.
2. **Unsupervised Learning**: Algorithms learn from unlabeled data to discover hidden patterns or structures.
3. **Reinforcement Learning**: Algorithms learn through trial and error to maximize rewards in a given environment.

For every machine learning problem, we need to define the following components:

1. **Model**
2. **Objective**
3. **Optimization**

### Model

**A model is a mapping function (hypothesis function) that takes input features and produces output based on the task.** For example, we can have a _regression_ model that takes in a list of house features (e.g., size, number of bedrooms) and predicts the house price, or a _classification_ model that takes in an image and predicts the text in the image. In the case of _unsupervised learning_, the model may map input features to some underlying structure or pattern, such as assigning data points to clusters or reducing dimensionality.

A model can be represented as a function $f(\cdot)$ that maps input features to an output:

$$
\begin{equation} \label{eq:model}
\mathbf{z} = f(\mathbf{x}; \theta),
\end{equation}
$$

where:

- $\mathbf{x}$ is the input feature vector,
- $\mathbf{z}$ is the output, which could represent:
  - $\hat{\mathbf{y}}$, the predicted value in supervised learning,
  - A latent representation, cluster assignment, or other structure in unsupervised learning,
- $\theta$ is the **parameter** vector of the model, also known as the **weights**.

Alternative, we can also represent the model function as:

$$
f_{\theta}(\mathbf{x}) = \mathbf{z},
$$

where $f_{\theta}$ denotes the model function with parameters $\theta$.

### Objective

The objective of a ML problem is to find the _optimal_ model parameters $\theta$ that maximize some performance. To define what is _optimal_, we use a _loss function_ (also known as a _cost function_ or _objective function_). A loss function is a mathematical function that measures how well the model's output aligns with the desired outcomes or patterns in the data. **Therefore, the objective of a machine learning problem is to minimize the loss function.**

We can define the general form of a loss function as:

$$
\begin{equation} \label{eq:loss}
L = \mathcal{L}(f(\mathbf{x}; \theta), \mathbf{y}),
\end{equation}
$$

where:

- $f(\mathbf{x}; \theta)$ is the model's output, given input $\mathbf{x}$ and parameters $\theta$,
- $\mathbf{y}$ is the true target value (optional: only used for supervised learning),
- $L$ is the loss value.

<blockquote class="note">

Typically, $L$ is a _scalar value_ representing the overall loss. In some cases, such as with multiple samples or structured outputs (e.g., images), the loss may initially be computed as a set of individual scalar losses (e.g., per sample or per pixel), which are then aggregated (e.g., summed or averaged) to yield a single scalar value.

</blockquote>

### Optimization

**Optimization refers to the process of _minimizing_ the loss function $\mathcal{L}$ in order to _optimize_ the model's performance by adjusting the model parameters $\theta$.**  In other words, we aim to find the optimal model parameters that will minimize the loss function and improve the model's performance.

Formally, the optimization problem can be written as:

$$
\begin{equation} \label{eq:optimization}
\theta^* = \arg\min_{\theta} \mathcal{L}(f(\mathbf{x}; \theta), \mathbf{y}).
\end{equation}
$$

where $\theta^*$ represents the optimal parameter values that minimize the loss function.

We can see that the model, objective, and optimization are all tied together in the ML process. The optimization process _optimizes_ on the lost function, and the loss function includes the model's hypothesis function to evaluate the model's performance.

## Gradient Descent (GD)

Before we introduce different types of ML problems, we look into the fundamental optimization algorithm used in machine learning: **gradient descent**.

Gradient descent is an iterative optimization algorithm used to minimize the loss function by updating the model parameters in the direction of the negative gradient. The GD update rule is defined as:

<blockquote class="equation">

**Gradient Descent Update Rule**:

$$
\begin{equation} \label{eq:gd}
\mathbf{\theta}^{(t+1)} = \mathbf{\theta}^{(t)} - \alpha \nabla_{\mathbf{\theta}} \mathcal{L}(\mathbf{\theta}),
\end{equation}
$$

</blockquote>

where:

- $\mathbf{\theta}^{(t)}$ is the parameter vector at iteration $t$,
- $\alpha$ is the scalar **learning rate** that controls the step size of the update,
- $\nabla_{\mathbf{\theta}} \mathcal{L}(\mathbf{\theta})$ is the **gradient** of the loss function with respect to the parameter vector $\mathbf{\theta}$.

Therefore, the loss function $\mathcal{L}(\cdot)$ must be **differentiable** with respect to the model parameters $\mathbf{\theta}$ to compute the gradient.

Note that we can use GD to optimize _any_ differentiable function. For example, consider a simple function:

$$
\mathcal{L}(\theta) = \left( \theta - 5 \right)^2
$$

We aim to find the optimal value of $\theta$ that minimizes the loss function following $\eqref{eq:optimization}$. We can graph this simple function:

```desmos
(x-5)^2
```

We can clearly see that the minimum value of the function $\mathcal{L}(\theta)$ is attained at $\theta = 5$. We can also compute this value through simple calculus, given that we know $\mathcal{L}(\theta)$ is a convex function (we can also compute the second derivative to confirm this):

$$
\begin{aligned}
\frac{d}{d\theta} \mathcal{L}(\theta) &= 2(\theta - 5) \doteq 0 \implies \theta = 5.
\end{aligned}
$$

Now, we can implement the GD algorithm to find the optimal value of $\theta$ that minimizes the loss function:

```execute-python
import numpy as np

# Loss function
def loss(theta):
    return (theta - 5) ** 2

# Gradient of the loss function
def gradient(theta):
    return 2 * (theta - 5)

# Gradient Descent
theta = 0  # Initial parameter value
alpha = 0.1  # Learning rate
n_iterations = 100  # Number of iterations

for i in range(n_iterations):
    theta = theta - alpha * gradient(theta)

# Final parameter value
print("Optimal theta:", theta)
```

As we can see, GD converges to the optimal value of $\theta = 5$ that minimizes the loss function. This simple example demonstrates the basic principle of gradient descent.

<blockquote class="note">

So why not just use calculus to find the optimal value? The answer is that in many real-world ML problems, the loss function is not as simple as the one we just saw. It may be a complex function with many parameters, and the optimal solution may not have a closed-form solution. Therefore, we use iterative optimization algorithms like GD to find the optimal parameters.

</blockquote>

<details><summary>Convergence Analysis of Gradient Descent</summary>

### Convergence Analysis of Gradient Descent

The convergence of gradient descent depends on the choice of the learning rate $\alpha$ and the properties of the loss function. For the following analysis, we only consider any loss function that is **convex** and **differentiable**.

<blockquote class="definition" id="def:convex">

A function $ f: \mathbb{R}^n \to \mathbb{R} $ is **convex** if, for any two points $ x, y \in \mathbb{R}^n $ and any $ \lambda \in [0, 1] $, the following inequality holds:

$$
\begin{equation} \label{eq:convex}
 f(\lambda x + (1 - \lambda) y) \leq \lambda f(x) + (1 - \lambda) f(y)
\end{equation}
$$

</blockquote>

```tikz

\begin{document}
\begin{tikzpicture}[scale=1.5]
    % Define the convex function (a parabola in this case)
    \draw[domain=0:3.75, smooth, variable=\x, thick, blue] plot ({\x}, {0.6*\x*\x - 2*\x + 2});

    % Draw the axes
    \draw[->] (-0.5,0) -- (4,0) node[right] {$x$};
    \draw[->] (0,-0.5) -- (0,3) node[above] {$y$};

    % Choose two points on the function
    \coordinate (x1) at (0.5,1.15);
    \coordinate (x2) at (3.5,2.35);

    % Draw points and their projections
    \fill[red] (x1) circle (2pt) node[below left] {$x_1$};
    \fill[red] (x2) circle (2pt) node[below right] {$x_2$};
    \draw[dashed] (x1) -- (0.5,0) node[below] {$x_1$};
    \draw[dashed] (x2) -- (3.5,0) node[below] {$x_2$};

    % Draw the line segment between the points
    \draw[thick, red] (x1) -- (x2) node[midway, above, sloped] {};

    % Choose a point for λx₁ + (1-λ)x₂
    \coordinate (z) at (2,0.4);
    \fill[green!50!black] (z) circle (2pt) node[below right] {$f(\lambda x_1 + (1-\lambda)x_2)$};
    \draw[dashed] (z) -- (2,0) node[below] {$\lambda x_1 + (1-\lambda)x_2$};
    \draw[dashed] (z) -- (2, 1.75) node[above, yshift=4mm] {};

    \fill[blue!50!black] (2,1.75) circle (2pt) node[above, yshift=4mm, xshift=-2mm] {$\lambda f(x_1) + (1-\lambda)f(x_2)$};

    % Label the function
    \node[right] at (3.5,3) {$f(x)$};
\end{tikzpicture}
\end{document}

```

<div class="caption">

A convex function states that the line segment connecting any two points on the graph of the function lies above or on the graph itself. In the graph above, the function $ f(x) $ is convex because the line segment connecting $ x_1 $ and $ x_2 $ lies above the function.

</div>

Given that most optimization problems involve convex and differentiable functions, we deduce the following property for convex and differentiable functions:

<blockquote class="lemma">

If $f: \mathbb{R}^n \to \mathbb{R}$ is a **convex** and **differentiable** function, then the following inequality holds for any two points $x, y \in \mathbb{R}^n$:

$$
\begin{equation} \label{eq:convex-gradient}
f(y) \geq f(x) + \langle \nabla f(x), y - x \rangle
\end{equation}
$$

</blockquote>

<blockquote class="proof">

We can deduce $\eqref{eq:convex-gradient}$ from $\eqref{eq:convex}$ by rearranging the terms:

$$
\begin{aligned}
f(\lambda x + (1 - \lambda) y) &\leq \lambda f(x) + (1 - \lambda) f(y) \\
f(\lambda x + (1 - \lambda) y) &\leq \lambda f(x) + f(y) - \lambda f(y) \\
f(\lambda x + y - \lambda y) - f(y) &\leq \lambda (f(x) - f(y)) \\
\frac{f(y  + \lambda (x - y)) - f(y)}{\lambda} &\leq f(x) - f(y) \\
\end{aligned}
$$

Now taking the limit when $\lambda \to 0$, and using the definition of [directional derivative](https://en.wikipedia.org/wiki/Directional_derivative#For_differentiable_functions):

$$
\begin{aligned}
\lim_{\lambda \to 0} \frac{f(y  + \lambda (x - y)) - f(y)}{\lambda} &\leq f(x) - f(y) \\
\langle \nabla f(y), x - y \rangle &\leq f(x) - f(y).
\end{aligned}
$$

</blockquote>

Furthermore, for the sake of this analysis, we assume that the _gradient_ of the loss function is **Lipschitz continuous**. We define this term in [**Definition 2.4**](#def:lipschitz).

<blockquote class="definition" id="def:lipschitz">

A differentiable function $ f: \mathbb{R}^n \to \mathbb{R} $ is said to have an **Lipschitz continuous** gradient if, for any two points $ x, y \in \mathbb{R}^n $, the following inequality holds given a constant $ L $:

$$
\begin{equation} \label{eq:lipschitz}
\| \nabla f(x) - \nabla f(y) \| \leq L \| x - y \|
\end{equation}
$$

</blockquote>

This condition restricts how rapidly the function itself can change between two points. In other words, the function's rate of change is bounded by $L$, which is called the **Lipschitz constant**. Any function where the gradient is Lipschitz continuous is said to be **L-smooth** with respect to the Lipschitz constant $L$.

<details><summary>Example of Lipschitz Continuous Gradient</summary>

Consider the following function:

$$
\begin{equation} \label{eq:lipschitz-example}
f(x) = x^4
\end{equation}
$$

The gradient of this function is:

$$
\begin{equation} \label{eq:lipschitz-gradient}
\nabla f(x) = 4x^3
\end{equation}
$$

```tikz
\usepackage{pgfplots}

\begin{document}
\begin{tikzpicture}
    \begin{axis}[
        axis lines = center,
        xlabel = $x$,
        ylabel = {$f(x), \nabla f(x)$},
        xmin = -2, xmax = 2,
        ymin = -4, ymax = 8,
        samples = 100,
        domain = -2:2,
        legend pos = north west,
        legend style={draw=none, fill=none},
        smooth
    ]
    % Plot of the function f(x) = x^4
    \addplot[
        blue,
        thick
    ]{x^4};
    \addlegendentry{$f(x) = x^4$}

    % Plot of the gradient f'(x) = 4x^3
    \addplot[
        red,
        dashed,
        thick
    ]{4*x^3};
    \addlegendentry{$\nabla f(x) = 4x^3$}

    \end{axis}
\end{tikzpicture}
\end{document}
```

We show that $\eqref{eq:lipschitz-example}$ is **L-smooth**, or $\eqref{eq:lipschitz-gradient}$ is **Lipschitz continuous**.

<blockquote class="proof">

We need to show that $\eqref{eq:lipschitz-gradient}$ satisfies the Lipschitz condition, which is:

$$
|4x^3 - 4y^3| \leq L|x - y|.
$$

Factor the left-hand side:

$$
\begin{aligned}
|4x^3 - 4y^3| = 4|x^3 - y^3| = 4|x - y||x^2 + xy + y^2|.
\end{aligned}
$$

Therefore, we need $L$ to satisfy:

$$
\begin{aligned}
4|x - y||x^2 + xy + y^2| &\leq L|x - y| \\
4|x^2 + xy + y^2| &\leq L.
\end{aligned}
$$

Thus, to find the Lipschitz constant $L$, we need to bound $|x^2 + xy + y^2|$ for all $x, y \in \mathbb{R}$. We can analyze the following cases:

1. If $x = y$, then $|x^2 + xy + y^2| = 3x^2$.
2. If $x = 0$ and $y \neq 0$, then $|x^2 + xy + y^2| = y^2$.
3. If $x \neq 0$ and $y = 0$, then $|x^2 + xy + y^2| = x^2$.

Therefore, for general $x$ and $y$, $x^2 + xy + y^2$ grows quadratically with $x$ and $y$, where the largest possible value is proportional to $3x^2$. Thus, we can replace $|x^2 + xy + y^2|$ with $3x^2$:

$$
\begin{aligned}
4|x^2 + xy + y^2| &\leq 4 \cdot 3x^2 = 12x^2.
\end{aligned}
$$

Therefore, we can choose $L = 12$ as the Lipschitz constant for the gradient of $f(x) = x^4$.

</blockquote>

</details>

<blockquote class="lemma">

If $f: \mathbb{R}^n \to \mathbb{R}$ is L-smooth, then for any two points $x, y \in \mathbb{R}^n$, the following inequality holds:

$$
\begin{equation} \label{eq:l-smooth}
f(y) \leq f(x) + \langle \nabla f(x), y - x \rangle + \frac{L}{2} \| y - x \|_2^2
\end{equation}
$$

</blockquote>

<blockquote class="proof">

Let $x, y \in \mathbb{R}^n$ be fixed, and let $g(t) = f(x + t(y - x))$. By the chain rule, we have:

$$
\begin{aligned}
g'(t) &= \nabla f(x + t(y - x))^T (y - x) \\
&= \langle \nabla f(x + t(y - x)), y - x \rangle.
\end{aligned}
$$

Using the Fundamental Theorem of Calculus, we can write:

$$
\begin{aligned}
f(y) &= f(x) + \int_{0}^{1} g'(t) dt \\
&= f(x) + \int_{0}^{1} \langle \nabla f(x + t(y - x)), y - x \rangle dt.
\end{aligned}
$$

Applying linearity of the inner product $\langle a+b, c \rangle = \langle a, c \rangle + \langle b, c \rangle$, we get:

$$
\begin{aligned}
f(y) &= f(x) + \int_{0}^{1} \langle \nabla f(x), y - x \rangle  + \langle \nabla f(x + t(y - x)) - \nabla f(x), y - x \rangle dt \\
&= f(x) + \langle \nabla f(x), y - x \rangle + \int_{0}^{1} \langle \nabla f(x + t(y - x)) - \nabla f(x), y - x \rangle dt.
\end{aligned}
$$

Applying [Cauchy-Schwarz inequality](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality) to the inner product, we get:

$$
\begin{aligned}
f(y) &\leq f(x) + \langle \nabla f(x), y - x \rangle + \int_{0}^{1} \| \nabla f(x + t(y - x)) - \nabla f(x) \| \| y - x \| dt.
\end{aligned}
$$

Since $f$ is L-smooth, we can apply the Lipschitz condition $\eqref{eq:lipschitz}$ to deduce

$$
\begin{aligned}
\| \nabla f(x + t(y - x)) - \nabla f(x) \| \leq L \|x + t(y - x) -x\| = Lt \|y - x\|.
\end{aligned}
$$

Plugging this back into the inequality, we get:

$$
\begin{aligned}
f(y) &\leq f(x) + \langle \nabla f(x), y - x \rangle + \int_{0}^{1} Lt \|y - x\| \|y - x\| dt \\
&\leq f(x) + \langle \nabla f(x), y - x \rangle + \frac{L}{2} \|y - x\|_2^2.
\end{aligned}
$$

</blockquote>

We can also relate L-smoothness to the convergence of gradient descent. We can see the relationship in the following lemma:

<blockquote class="lemma">

If $f$ is L-smooth and $\alpha > 0$, then the following inequality holds for any two points $x, y \in \mathbb{R}^n$:

$$
\begin{equation} \label{eq:l-smooth-convergence}
f(x - \alpha \nabla f(x)) \leq f(x) - \frac{\alpha (1 - \alpha L)}{2} \| \nabla f(x) \|_2^2.
\end{equation}
$$

</blockquote>

<blockquote class="proof">

Coming soon...

</blockquote>

#### Fixed Learning Rate

<blockquote class="theorem">

Suppose the function $f: \mathbb{R}^n \to \mathbb{R}$ is convex and L-smooth and $x^{*} = \arg\min_{x} f(x)$, then, GD with learning rate (step size) $\alpha = \frac{1}{L}$ satisfies the following convergence rate:

$$
\begin{equation} \label{eq:gd-convergence}
f(x^k) \leq f(x^*) + \frac{\|x^0 - x^*\|_2^2}{2\alpha k},
\end{equation}
$$

where $x^k$ is the parameter vector at iteration $k$ and $x^0$ is the initial parameter vector.

</blockquote>

<blockquote class="proof">

Given $\alpha = \frac{1}{L}$, we can apply the update rule for GD in $\eqref{eq:gd}$:

$$
\begin{aligned}
x^{k+1} &= x^k - \alpha \nabla f(x^k) \\
&= x^k - \frac{1}{L} \nabla f(x^k).
\end{aligned}
$$

Our goal is to bound $f(x^k) - f(x^*)$ in terms of $\|x^0 - x^*\|$ and $k$.

Coming soon...

</blockquote>

</details>

### Types of Gradient Descent

In practice, we tend to vectorize the GD computation to handle multiple parameters and samples. We introduce the different types of GD algorithms:

1. **Batch Gradient Descent**: Computes the gradient of the loss function with respect to the entire dataset.
2. **Stochastic Gradient Descent (SGD)**: Computes the gradient with respect to a single training example at each iteration.
3. **Mini-Batch Gradient Descent**: Computes the gradient with respect to a subset of the training examples (mini-batch) at each iteration.

We will see examples of these GD algorithms in the linear regression section.

## Supervised Learning

<blockquote class="definition">

Supervised learning is a category of machine learning that uses **labeled** data to train algorithms to predict outcomes and recognize patterns.

</blockquote>

In the previous section, we have definied the general form of _model_, _objective_, and _optimization_ in machine learning. In supervised learning, we can further narrow down these components:

- **Model**: In supervised learning, the model always predicts the _target feature_ based on the _input features_. We can categorize supervised learning models into two types:
  - **Regression**: Models that predict continuous values.
  - **Classification**: Models that predict discrete values (e.g., categories or labels).

  In general, the model can be represented as:

  $$
  \begin{equation} \label{eq:model-supervised}
  \hat{\mathbf{y}} = f_{\theta}(\mathbf{x}),
  \end{equation}
  $$

  where $\hat{\mathbf{y}}$ is the _predicted target value_, $\mathbf{x}$ is the input feature vector, and $\theta$ is the parameter vector of the model.

- **Objective**: In supervised learning, the objective is to minimize the _loss function_ that measures the difference between the predicted values and the actual values. It looks the same as the general form $\eqref{eq:loss}$, but the _true label_ $\mathbf{y}$ is included:

  $$
  \begin{equation} \label{eq:loss-supervised}
  L = \mathcal{L}(\hat{\mathbf{y}}, \mathbf{y}).
  \end{equation}
  $$

- **Optimization**: This is the same as the optimization step described in $\eqref{eq:optimization}$, where we aim to find the optimal parameter vector $\theta$ that minimizes the loss function.

### Regression

<blockquote class="definition">

**Regression** is a type of supervised learning algorithm used to predict continuous values. In regression, the model learns the relationship between the input features and the target values to make predictions.

</blockquote>

In regression, the target values are continuous, and the goal is to predict a continuous value based on the input features. For example, we can use regression to predict house prices based on features like size, number of bedrooms, and location.

#### Linear Regression

Linear regression is a supervised learning algorithm used to model the relationship between a dependent variable and one or more independent variables. The goal of linear regression is to find the best-fitting linear relationship between the input features and the target values.

**Data Representation**

In linear regression, we have a set of _observations_ $\mathbf{X} = \begin{bmatrix}
x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\
x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\
\vdots & \vdots & \vdots & \vdots \\
x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)}
\end{bmatrix}$, where each row $\mathbf{x}^{(i)} = \begin{bmatrix}
x_1^{(i)} & x_2^{(i)} & \cdots & x_n^{(i)}
\end{bmatrix}$ is a _feature vector_, and a set of corresponding _target values_ (aka. labels) $\mathbf{y} = \begin{bmatrix}
y^{(1)} \\
y^{(2)} \\
\vdots \\
y^{(m)}
\end{bmatrix}$, where $m$ is the number of observations, $n$ is the number of features.

In linear regression, we often add a _bias term_ to the feature vector $\mathbf{x}$ to account for the intercept term in the linear relationship. Therefore, the feature matrix $\mathbf{X}$ is defined as:

$$
\mathbf{X} = \begin{bmatrix}
1 & x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\
1 & x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)}
\end{bmatrix},
$$

where the first column is set to 1 to account for the bias term. (Think of this as adding a y-intercept to the linear equation.)

**Model**

Following the general form $\eqref{eq:model-supervised}$, we can predict a single target value $\hat{y}^{(i)}$ for the $i$-th observation using the linear regression model:

$$
\begin{equation} \label{eq:linear-regression}
\hat{y}^{(i)} = f_{\theta}(\mathbf{x}^{(i)}) = \theta^T \mathbf{x}^{(i)} = \theta_0 + \theta_1 x_1^{(i)} + \theta_2 x_2^{(i)} + \cdots + \theta_n x_n^{(i)},
\end{equation}
$$

where $\theta = \begin{bmatrix}
\theta_0 & \theta_1 & \cdots & \theta_n
\end{bmatrix}$ is the parameter vector of the model. In addition, we can also represent the model in matrix form:

$$
\begin{equation} \label{eq:linear-regression-matrix}
\hat{\mathbf{y}} = f_{\theta}(\mathbf{X}) = \mathbf{X} \mathbf{\theta},
\end{equation}
$$

where $\hat{\mathbf{y}} = \begin{bmatrix}
\hat{y}^{(1)} \\
\hat{y}^{(2)} \\
\vdots \\
\hat{y}^{(m)}
\end{bmatrix}$ is the predicted target vector.

**Loss Function**

Recall that a loss function is used to _evaluate_ the model's performance. Expanding on $\eqref{eq:loss-supervised}$, we define **mean squared error (MSE)**, a common loss function used in linear regression:

<blockquote class="equation">

**Mean Squared Error (MSE)**:

$$
\begin{equation} \label{eq:mse}
\begin{split}
L_{\text{MSE}} = \mathcal{L}(\hat{\mathbf{y}}, \mathbf{y}) &= \frac{1}{m} \left\| \mathbf{X}\mathbf{\theta} - \mathbf{y} \right\|_2^2 \\
&= \frac{1}{m} \sum_{i=1}^{m} \left( \hat{y}^{(i)} - y^{(i)} \right)^2.
\end{split}
\end{equation}
$$

</blockquote>

Note that we use the general matrix form $\eqref{eq:linear-regression-matrix}$ in the first equation, and the individual prediction form $\eqref{eq:linear-regression}$ in the second equation.

**Optimization**

Recall that the goal of opimization is to find the _optimal_ parameter vector $\theta$ that minimizes the loss function. There are a few ways to minimize $L_{\text{MSE}}$ in linear regression. The most common methods are:

1. **Normal Equation**: An analytical solution to the linear regression problem.
2. **Gradient Descent**: An iterative optimization algorithm to minimize the loss function.

**Normal Equation**

The normal equation is a closed-form solution to the linear regression problem.

<blockquote class="equation">

**Normal Equation**:

$$
\begin{equation} \label{eq:normal-equation}
\mathbf{\theta}^* = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}
\end{equation}
$$

</blockquote>

where $\mathbf{X}^T$ is the transpose of the feature matrix $\mathbf{X}$, and $\mathbf{X}^T \mathbf{X}$ is a square matrix. The normal equation provides an analytical solution to the linear regression problem.

<details><summary>Normal Equation Proof</summary>

<blockquote class="proof" id="proof:normal-equation">

Normal equation is actually just derived from calculus. We take the derivative of the loss function with respect to the parameter vector $\theta$ and set it to zero to find the optimal parameter vector $\theta$.

We begin by rearranging $L_{\text{MSE}}$ in $\eqref{eq:mse}$:

$$
\begin{align*}
L_{\text{MSE}} &= \frac{1}{m} \left\| \mathbf{X}\mathbf{\theta} - \mathbf{y} \right\|_2^2 \\
&= \frac{1}{m} (\mathbf{X}\mathbf{\theta} - \mathbf{y})^T (\mathbf{X}\mathbf{\theta} - \mathbf{y}) \tag*{$\left\|a\|^2 = a^Ta\right.$} \\
&= \frac{1}{m} (\mathbf{\theta}^T \mathbf{X}^T - \mathbf{y}^T) (\mathbf{X}\mathbf{\theta} - \mathbf{y}) \tag*{$(AB)^T = B^TA^T$} \\
&= \frac{1}{m} (\mathbf{\theta}^T \mathbf{X}^T \mathbf{X} \mathbf{\theta} - \mathbf{\theta}^T \mathbf{X}^T \mathbf{y} - \mathbf{y}^T \mathbf{X} \mathbf{\theta} + \mathbf{y}^T \mathbf{y}) \\
&= \frac{1}{m} (\mathbf{\theta}^T \mathbf{X}^T \mathbf{X} \mathbf{\theta} - 2\mathbf{\theta}^T \mathbf{X}^T \mathbf{y} + \mathbf{y}^T \mathbf{y}).
\end{align*}
$$

We review the properties of the gradient of a matrix-vector product:

- $A^TA$ is symmetric.
- $\frac{\partial}{\partial \theta} \left( \theta^T A \theta \right) = 2A\theta$, where $A$ is a symmetric matrix.
- $\frac{\partial}{\partial \theta} \left( \mathbf{b}^T \theta \right) = \mathbf{b}$, where $\mathbf{b}$ is a vector.

To find the optimal parameter vector $\theta$, we take the derivative of the loss function with respect to $\theta$ and set it to zero:

$$
\begin{align*}
\nabla_{\theta} L_{\text{MSE}} &= \frac{\partial}{\partial \theta} \left( \frac{1}{m} (\mathbf{\theta}^T \mathbf{X}^T \mathbf{X} \mathbf{\theta} - 2\mathbf{\theta}^T \mathbf{X}^T \mathbf{y} + \mathbf{y}^T \mathbf{y}) \right) \\
&= \frac{\partial}{\partial \theta} \left( \frac{1}{m} \mathbf{\theta}^T \mathbf{X}^T \mathbf{X} \mathbf{\theta} - \frac{2}{m} \mathbf{\theta}^T \mathbf{X}^T \mathbf{y} \right) \tag{$\mathbf{y}^T \mathbf{y}$ is a constant} \\
&= \frac{2}{m} \mathbf{X}^T \mathbf{X} \mathbf{\theta} - \frac{2}{m} \mathbf{X}^T \mathbf{y} \\
&= \frac{2}{m} \mathbf{X}^T (\mathbf{X}\mathbf{\theta} - \mathbf{y}).
\end{align*}
$$

Solving for $\theta$:

$$
\begin{aligned}
\frac{2}{m} \mathbf{X}^T \mathbf{X} \mathbf{\theta} - \frac{2}{m} \mathbf{X}^T \mathbf{y} &= 0. \\
\mathbf{X}^T \mathbf{X} \mathbf{\theta} &= \mathbf{X}^T \mathbf{y} \\
\mathbf{\theta} &= (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y} \tag{$A\theta = b \Rightarrow \theta = A^{-1}b$}.
\end{aligned}
$$

Therefore, the normal equation provides the optimal parameter vector $\theta$ that minimizes the loss function.

</blockquote>

</details>

<details><summary>Normal Equation Example</summary>

We can implement the normal equation for linear regression in Python. In this example, we generate random data points and use the normal equation to find the optimal parameter vector $\mathbf{\theta}$. We plot the computed regression line and the data points.

```execute-python
import numpy as np
import matplotlib.pyplot as plt

# Generate random data
np.random.seed(42)
m = 100  # Number of examples
X = 2 * np.random.rand(m, 1)  # Features (100x1 matrix)
y = 4 + 3 * X + np.random.randn(m, 1)  # Target values with some noise

# Add bias term (column of 1s) to X
X_b = np.c_[np.ones((m, 1)), X]  # X_b = [1, X] (100x2 matrix)

# Normal Equation
theta = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)

# Final parameter vector (theta)
print("Theta (parameters):", theta)

# Plotting the results
plt.figure(figsize=(8, 4))
plt.plot(X, y, "b.")
plt.plot(X, X_b.dot(theta), "r-")
plt.xlabel("X")
plt.ylabel("y")
plt.title("Linear Regression with Normal Equation")

get_image(plt)
```

The normal equation provides the optimal parameter vector $\mathbf{\theta}$ that minimizes the loss function (MSE). The regression line fits the data points well, and the loss is minimized.

</details>

Although the normal equation provides an optimal solution to linear regression, it is computationally expensive for large datasets due to the matrix inversion operation. For large datasets, we use iterative optimization algorithms such as **gradient descent**.

**Gradient Descent**

We can also use gradient descent to minimize the loss function in linear regression. We expand $\eqref{eq:gd}$ for linear regression with the MSE loss function $\eqref{eq:mse}$:

$$
\begin{equation} \label{eq:gd-linear-regression}
\mathbf{\theta}^{(t+1)} = \mathbf{\theta}^{(t)} - \alpha \nabla_{\mathbf{\theta}} \left( \frac{1}{m} \left\| \mathbf{X}\mathbf{\theta} - \mathbf{y} \right\|_2^2 \right).
\end{equation}
$$

Therefore, we need to compute $\nabla_{\mathbf{\theta}} L_{\text{MSE}}$ to update the parameter vector $\mathbf{\theta}$. We have already done this in the [proof of the normal equation](#proof:normal-equation).

<blockquote class="equation">

**MSE Gradient**:

$$
\begin{equation} \label{eq:mse-gradient}
\nabla_{\mathbf{\theta}} L_{\text{MSE}} = \frac{2}{m} \mathbf{X}^T (\mathbf{X}\mathbf{\theta} - \mathbf{y})
\end{equation}
$$

</blockquote>

The gradient descent algorithm for linear regression is as follows:

1. Initialize the parameter vector $\mathbf{\theta}$ randomly.
2. Compute the predicted values $\hat{\mathbf{y}} = f_{\theta}(\mathbf{X}) = \mathbf{X} \mathbf{\theta}$.
4. Compute the gradient of the loss function $\nabla_{\mathbf{\theta}} L_{\text{MSE}}$ using $\eqref{eq:mse-gradient}$.
5. Update the parameter vector using the gradient descent update rule: $ \mathbf{\theta} = \mathbf{\theta} - \alpha \nabla_{\mathbf{\theta}} L_{\text{MSE}}$.
6. Repeat steps 2-4 until convergence.

<details><summary>Gradient Descent Example</summary>

We can implement the gradient descent algorithm for linear regression in Python. In this example, we also add a termination condition based on the change in the loss function to stop the optimization process when the loss converges. We plot both the computed regression line and the convergence of the loss function.

The termination condition is computed as:

$$
\text{abs}(L^{(t-1)} - L^{(t)}) < \text{tolerance},
$$

where $L^{(t)}$ is the loss at iteration $t$, and $\text{tolerance}$ is a small value to determine convergence.

```execute-python
import numpy as np
import matplotlib.pyplot as plt

# Generate random data
np.random.seed(42)
m = 100  # Number of examples
X = 2 * np.random.rand(m, 1)  # Features (100x1 matrix)
y = 4 + 3 * X + np.random.randn(m, 1)  # Target values with some noise

# Add bias term (column of 1s) to X
X_b = np.c_[np.ones((m, 1)), X]  # X_b = [1, X] (100x2 matrix)

# Initialize parameter vector theta (2x1 matrix)
theta = np.random.randn(2, 1)

# Learning rate
alpha = 0.1
# Maximum number of iterations
n_iterations = 10000000
# Tolerance for convergence
tolerance = 1e-10

# Function to compute MSE loss
def compute_mse(X_b, y, theta):
    m = len(y)
    predictions = X_b.dot(theta)
    mse = (1/m) * np.sum((predictions - y) ** 2)
    return mse

# Gradient Descent with termination condition
loss_values = []
for iteration in range(n_iterations):
    y_hat = X_b.dot(theta)
    loss = compute_mse(X_b, y, theta)
    gradients = 2/m * X_b.T.dot(y_hat - y)
    theta = theta - alpha * gradients
    loss_values.append(loss)

    # Termination condition
    if iteration > 0 and abs(loss_values[-2] - loss_values[-1]) < tolerance:
        print(f"Convergence reached at iteration {iteration}")
        break

# Final parameter vector (theta)
print("Theta (parameters):", theta)

# Final loss
print("Final Loss (MSE):", loss_values[-1])

# Plotting the results
plt.figure(figsize=(8, 4))

# Plot data and regression line
plt.subplot(1, 2, 1)
plt.plot(X, y, "b.")
plt.plot(X, X_b.dot(theta), "r-")
plt.xlabel("X")
plt.ylabel("y")
plt.title("Linear Regression with Gradient Descent")

# Plot loss values
plt.subplot(1, 2, 2)
plt.plot(loss_values, "g-")
plt.xlabel("Iteration")
plt.ylabel("Loss (MSE)")
plt.title("Loss Convergence")

plt.tight_layout()

get_image(plt)
```

As shown in the plot, the gradient descent algorithm converges to the optimal parameter vector $\mathbf{\theta}$ that minimizes the loss function (MSE). The regression line fits the data points well, and the loss decreases over iterations until convergence.

</details>

**Stochastic Gradient Descent**

Stochastic gradient descent (SGD) is a variant of gradient descent that updates the parameter vector using a single training example at a time, instead of the entire dataset. This approach is computationally efficient for large datasets and can escape local minima due to the stochastic nature of the updates.

The update rule for stochastic gradient descent is defined as:

<blockquote class="equation">

**Stochastic Gradient Descent Update Rule**:

$$
\begin{equation} \label{eq:sgd}
\mathbf{\theta}^{(t+1)} = \mathbf{\theta}^{(t)} - \alpha \nabla_{\mathbf{\theta}} \mathcal{L}\left( f_{\theta}(\mathbf{x}^{(i)}), y^{(i)} \right),
\end{equation}
$$

</blockquote>

where $\mathbf{x}^{(i)}$ is a single training example, and $y^{(i)}$ is the corresponding target value. Therefore, comparing to the general form $\eqref{eq:gd-linear-regression}$, the gradient is computed with respect to the loss function of the **current training example** $(\mathbf{x}^{(i)}, y^{(i)})$.

In the case of linear regression with the MSE loss function, the gradient for a single training example $(\mathbf{x}^{(i)}, y^{(i)})$ is given by:

$$
\begin{equation} \label{eq:mse-gradient-sgd}
\nabla_{\mathbf{\theta}} \mathcal{L}\left( f_{\theta}(\mathbf{x}^{(i)}), y^{(i)} \right) = 2 \mathbf{x}^{(i)} (\hat{y}^{(i)} - y^{(i)}),
\end{equation}
$$

where $\hat{y}^{(i)} = \mathbf{\theta}^T \mathbf{x}^{(i)}$ is the predicted value for the training example.

<details><summary>MSE Gradient for SGD</summary>

To compute the gradient of the MSE loss function for stochastic gradient descent, we start by expanding the loss function for a single training example:

$$
\begin{align*}
\mathcal{L}\left( f_{\theta}(\mathbf{x}^{(i)}), y^{(i)} \right) &= \left( \mathbf{\theta}^T \mathbf{x}^{(i)} - y^{(i)} \right)^2 \\
&= \left( \mathbf{x}^{(i)T} \mathbf{\theta} - y^{(i)} \right)^2.
\end{align*}
$$

To find the gradient with respect to $\mathbf{\theta}$, we take the derivative of the loss function:

$$
\begin{align*}
\nabla_{\mathbf{\theta}} \mathcal{L}\left( f_{\theta}(\mathbf{x}^{(i)}), y^{(i)} \right) &= \frac{\partial}{\partial \mathbf{\theta}} \left( \mathbf{x}^{(i)T} \mathbf{\theta} - y^{(i)} \right)^2 \\
&= 2 \left( \mathbf{x}^{(i)T} \mathbf{\theta} - y^{(i)} \right) \frac{\partial}{\partial \mathbf{\theta}} \left( \mathbf{x}^{(i)T} \mathbf{\theta} - y^{(i)} \right) \\
&= 2 \left( \mathbf{x}^{(i)T} \mathbf{\theta} - y^{(i)} \right) \mathbf{x}^{(i)} \tag{$\frac{\partial}{\partial \mathbf{\theta}} \left( \mathbf{b}^T \mathbf{\theta} \right) = \mathbf{b}$}.
\end{align*}
$$

</details>

SGD for linear regression is as follows:

1. Initialize the parameter vector $\mathbf{\theta}$ randomly.
2. Shuffle the training examples.
3. For each training example $(\mathbf{x}^{(i)}, y^{(i)})$:
   - Compute the predicted value $\hat{y}^{(i)} = f_{\theta}(\mathbf{x}^{(i)})$.
   - Compute the gradient of the loss function $\nabla_{\mathbf{\theta}} \mathcal{L}\left( f_{\theta}(\mathbf{x}^{(i)}), y^{(i)} \right)$ using $\eqref{eq:mse-gradient-sgd}$.
   - Update the parameter vector using the stochastic gradient descent update rule: $\mathbf{\theta} = \mathbf{\theta} - \alpha \nabla_{\mathbf{\theta}} \mathcal{L}\left( f_{\theta}(\mathbf{x}^{(i)}), y^{(i)} \right)$.
4. Repeat step 3 for a fixed number of epochs or until convergence.

<details><summary>Stochastic Gradient Descent Example</summary>

We can implement the stochastic gradient descent algorithm for linear regression in Python. In this example, we use a single training example at each iteration to update the parameter vector. We also plot the convergence of the loss function over epochs.

```execute-python
import numpy as np
import matplotlib.pyplot as plt

# Generate random data
np.random.seed(42)
m = 100  # Number of examples
X = 2 * np.random.rand(m, 1)  # Features (100x1 matrix)
y = 4 + 3 * X + np.random.randn(m, 1)  # Target values with some noise

# Add bias term (column of 1s) to X
X_b = np.c_[np.ones((m, 1)), X]  # X_b = [1, X] (100x2 matrix)

# Initialize parameter vector theta (2x1 matrix)
theta = np.random.randn(2, 1)

# Learning rate
alpha = 0.01
# Number of epochs
n_epochs = 50

# Function to compute MSE loss
def compute_mse(X_b, y, theta):
    m = len(y)
    predictions = X_b.dot(theta)
    mse = (1/m) * np.sum((predictions - y) ** 2)
    return mse

# Stochastic Gradient Descent
loss_values = []
for epoch in range(n_epochs):
    for i in range(m):
        random_index = np.random.randint(m)
        xi = X_b[random_index:random_index+1]
        yi = y[random_index:random_index+1]
        y_hat = xi.dot(theta)
        loss = compute_mse(X_b, y, theta)
        gradients = 2 * xi.T.dot(y_hat - yi)
        theta = theta - alpha * gradients
        loss_values.append(loss)

# Final parameter vector (theta)
print("Theta (parameters):", theta)

# Final loss
print("Final Loss (MSE):", loss_values[-1])

# Plotting the results
plt.figure(figsize=(8, 4))

# Plot data and regression line
plt.subplot(1, 2, 1)
plt.plot(X, y, "b.")
plt.plot(X, X_b.dot(theta), "r-")
plt.xlabel("X")
plt.ylabel("y")
plt.title("Linear Regression with Stochastic Gradient Descent")

# Plot loss values
plt.subplot(1, 2, 2)
plt.plot(loss_values, "g-")
plt.xlabel("Iteration")
plt.ylabel("Loss (MSE)")
plt.title("Loss Convergence")

plt.tight_layout()

get_image(plt)
```

The stochastic gradient descent algorithm converges to the optimal parameter vector $\mathbf{\theta}$ that minimizes the loss function (MSE). The regression line fits the data points well, and the loss decreases over epochs until convergence.

</details>

**Mini-Batch Gradient Descent**

Mini-batch gradient descent is a compromise between batch gradient descent and stochastic gradient descent. It computes the gradient with respect to a subset of the training examples (mini-batch) at each iteration. This approach combines the efficiency of SGD with the stability of batch GD.

The update rule for mini-batch gradient descent is similar to SGD, but the gradient is computed with respect to a mini-batch of training examples:

<blockquote class="equation">

**Mini-Batch Gradient Descent Update Rule**:

$$
\begin{equation} \label{eq:mini-batch-gd}
\mathbf{\theta}^{(t+1)} = \mathbf{\theta}^{(t)} - \alpha \nabla_{\mathbf{\theta}} \left( \frac{1}{|\mathcal{B}|} \sum_{i \in \mathcal{B}} \mathcal{L}\left( f_{\theta}(\mathbf{x}^{(i)}), y^{(i)} \right) \right),
\end{equation}
$$

</blockquote>

where $\mathcal{B}$ is the mini-batch of training examples, and $|\mathcal{B}|$ is the size of the mini-batch.

In the case of linear regression with the MSE loss function, the gradient for a mini-batch of training examples $\mathcal{B}$ is given by:

$$
\begin{equation} \label{eq:mse-gradient-mini-batch}
\nabla_{\mathbf{\theta}} \left( \frac{1}{|\mathcal{B}|} \sum_{i \in \mathcal{B}} \mathcal{L}\left( f_{\theta}(\mathbf{x}^{(i)}), y^{(i)} \right) \right) = \frac{2}{|\mathcal{B}|} \mathbf{X}^T (\mathbf{X}\mathbf{\theta} - \mathbf{y}),
\end{equation}
$$

where $\mathbf{X}$ is the feature matrix of the mini-batch. The gradient is computed using the entire mini-batch of training examples.

**Optimization Algorithm Comparison**

Overall, we can compare the normal equation, gradient descent, stochastic gradient descent, and mini-batch gradient descent for linear regression based on their computational complexity and convergence properties. The choice of algorithm depends on the dataset size, computational resources, and optimization requirements.

| Method                            | Runtime Complexity | Convergence                | Accuracy                                                                      |
| --------------------------------- | ------------------ | -------------------------- | ----------------------------------------------------------------------------- |
| Normal Equation                   | $O(n^3)$           | Instant (non-iterative)    | Exact solution for convex problems                                            |
| Gradient Descent                  | $O(kn^2)$          | Linear convergence rate    | Can achieve high accuracy with proper learning rate and sufficient iterations |
| Stochastic Gradient Descent (SGD) | $O(kn)$            | Sublinear convergence rate | Can approach optimal solution, but may oscillate around it                    |
| Mini-Batch Gradient Descent       | $O(kn)$            | Sublinear convergence rate | Balance between SGD and batch GD, suitable for large datasets                 |

##### Interactive Example

Below we present an interactive example of linear regression using gradient descent. Suppose we have a dataset with one feature and one target value, which are represented as:

$$
\mathbf{X} = \begin{bmatrix}
1 & x^{(1)} \\
1 & x^{(2)} \\
\vdots & \vdots \\
1 & x^{(m)}
\end{bmatrix}, \quad \mathbf{y} = \begin{bmatrix}
y^{(1)} \\
y^{(2)} \\
\vdots \\
y^{(m)}
\end{bmatrix},
$$

where $m$ is the number of examples and $x^{(i)}$ is the feature value for example $i$. In addition, we also add in the bias term to the feature matrix $\mathbf{X}$.

In this simple example, we can derive the model from $\eqref{eq:linear-regression}$:

$$
\begin{equation} \label{eq:example-hypothesis}
\hat{y}^{(i)} = f_{\theta}(\mathbf{x}^{(i)}) = \theta_0 + \theta_1 x^{(i)},
\end{equation}
$$

where $\theta_0$ is the bias term and $\theta_1$ is the weight of the feature $x$. We use the MSE loss function $\eqref{eq:mse}$ to evaluate the model's performance.

Finally, we apply the gradient descent update rule $\eqref{eq:gd-linear-regression}$ to find the optimal parameter vector $\bm{\theta}$ that minimizes the loss function. To do this, we expand on the MSE gradient $\eqref{eq:mse-gradient}$ to apply to our example:

$$
\begin{align*}
\nabla_{\mathbf{\theta}} L_{\text{MSE}} &= \frac{2}{m} \mathbf{X}^T (\mathbf{X}\mathbf{\theta} - \mathbf{y}) \\
\frac{\partial L_{\text{MSE}}}{\partial \theta_0} &= \frac{2}{m} \sum_{i=1}^{m} (\theta_0 + \theta_1 x^{(i)} - y^{(i)}) \\
\frac{\partial L_{\text{MSE}}}{\partial \theta_1} &= \frac{2}{m} \sum_{i=1}^{m} (\theta_0 + \theta_1 x^{(i)} - y^{(i)}) x^{(i)}.
\end{align*}
$$

Now, we can perform the GD update rule $\eqref{eq:gd-linear-regression}$ to find the optimal parameter vector $\bm{\theta} = \begin{bmatrix}
\theta_0 & \theta_1
\end{bmatrix}$.

$$
\begin{aligned}
\theta_0^{(t+1)} &= \theta_0^{(t)} - \alpha \frac{2}{m} \sum_{i=1}^{m} (\theta_0^{(t)} + \theta_1^{(t)} x^{(i)} - y^{(i)}), \\
\theta_1^{(t+1)} &= \theta_1^{(t)} - \alpha \frac{2}{m} \sum_{i=1}^{m} (\theta_0^{(t)} + \theta_1^{(t)} x^{(i)} - y^{(i)}) x^{(i)},
\end{aligned}
$$

where $\alpha > 0$ is the learning rate.

Since we are only dealing with two parameters $\theta_0$ and $\theta_1$, we can treat the model hypothesis function $\eqref{eq:example-hypothesis}$ as a linear function in the form of $y = mx + b$ on a $xy$-plane, where $m = \theta_1$ and $b = \theta_0$.

The interactive plot below allows you to adjust the learning rate and perform each iteration of gradient descent to find the optimal parameter vector $\bm{\theta}$ that minimizes the loss function.

```component

{
    componentName: "linearRegression"
}

```

### Classification

<blockquote class="definition">

**Classification** is a type of supervised learning algorithm used to predict discrete values (classes or categories). In classification, the model learns the relationship between the input features and the target classes to make predictions.

</blockquote>

In classification, the target values are discrete classes or categories, and the goal is to predict the class label based on the input features. For example, we can use classification to predict whether an email is spam or not based on the email content.

There are many terms to evaluate the performance of a classification model. We will discuss some of the most common terms:

- **Confusion Matrix**
- **Precision and Recall**
- **F1 Score**
- **ROC Curve and AUC**

**Confusion Matrix**

A confusion matrix is a table that is often used to describe the performance of a classification model on a set of test data for which the true values are known. The confusion matrix consists of four terms:

- **True Positives (TP)**: The number of positive instances correctly classified as positive.
- **True Negatives (TN)**: The number of negative instances correctly classified as negative.
- **False Positives (FP)**: The number of negative instances incorrectly classified as positive.
- **False Negatives (FN)**: The number of positive instances incorrectly classified as negative.

The confusion matrix is often represented as:

$$
\begin{array}{|c|c|c|}
\hline
& \text{Actual Positive} & \text{Actual Negative} \\
\hline
\text{Predicted Positive} & \text{TP} & \text{FP} \\
\text{Predicted Negative} & \text{FN} & \text{TN} \\
\hline
\end{array}
$$

We can also have a confusion matrix for multi-class classification problems, where each row and column represent a class, for example, we can have the following confusion matrix for a 5-class classification problem, where the classes are $\{i, e, a, o, u\}$. Each row represents the predicted class, and each column represents the actual class:

$$
\begin{array}{|c|c|c|c|c|c|c|}
\hline
\text{Predicted\,\textbackslash\ Actual} & \text{i} & \text{e} & \text{a} & \text{o} & \text{u} \\ \hline
\text{i} & 15 & 1 &   &   &   \\ \hline
\text{e} & 1  & 1 &   &   &   \\ \hline
\text{a} &    &   & 79 & 5 &   \\ \hline
\text{o} &    &   & 4  & 15 & 3 \\ \hline
\text{u} &    &   &    & 2  & 2 \\ \hline
\end{array}
$$

<div class="caption">
    Source: <a href="https://en.wikipedia.org/wiki/Confusion_matrix">Wikipedia</a>
</div>

Fo example, $79$ at the intersection of the row $a$ and the column $a$ means that $79$ instances of class $a$ were correctly classified as class $a$, while $5$ instances of class $a$ were incorrectly classified as class $o$.

**Precision and Recall**

<blockquote class="definition">

**Precision** is the ratio of correctly predicted positive observations to the total predicted positive observations. It is defined as:

$$
\begin{equation} \label{eq:precision}
\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}.
\end{equation}
$$

</blockquote>

<blockquote class="definition">

**Recall** is the ratio of correctly predicted positive observations to the all observations in actual class. It is defined as:

$$
\begin{equation} \label{eq:recall}
\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}.
\end{equation}
$$

</blockquote>

Precision and recall are important metrics in classification problems, especially when the classes are imbalanced. Precision measures the accuracy of the positive predictions, while recall measures the coverage of the positive instances.

**F1 Score**

<blockquote class="definition">

**F1 Score** is the harmonic mean of precision and recall. It is defined as:

$$
\begin{equation} \label{eq:f1-score}
\text{F1 Score} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{\text{TP}}{\text{TP} + \frac{1}{2}(\text{FN} + \text{FP})}.
\end{equation}
$$

</blockquote>

The F1 score is a single metric that combines both precision and recall. It is useful when we want to balance the _trade-off_ between precision and recall.

**ROC Curve and AUC**

**ROC Curve** (Receiver Operating Characteristic Curve) is a graphical representation of the true positive rate (recall) $\left(\frac{\text{TP}}{\text{TP} + \text{FN}}\right)$ against the false positive rate $\left(\frac{\text{FP}}{\text{FP} + \text{TN}}\right)$. The ROC curve is used to evaluate the performance of a classification model at various thresholds.

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Bgc9QOjhnL70g2SQxyj6hQ.png" alt="ROC Curve" style="max-height: 300px;">
<div class="caption">
    Source: <a href="https://medium.com/@ilyurek/roc-curve-and-auc-evaluating-model-performance-c2178008b02">ROC Curve and AUC: Evaluating Model Performance</a>
</div>

**AUC** (Area Under the Curve) is the area under the ROC curve. The AUC score ranges from 0 to 1, where a score of 1 indicates a perfect classifier, and a score of 0.5 indicates a random classifier.

#### Logistic Regression

Logistic regression is a **classification** algorithm that models the probability of a **binary outcome** based on one or more input features. The logistic regression model uses the logistic function (sigmoid function) to predict the probability that the dependent variable belongs to a particular category.

For the following section, we define class $0$ as the negative class and class $1$ as the positive class.

<blockquote class="note">

Despite its name, logistic regression is a classification algorithm, not a regression algorithm.

</blockquote>

**Data Representation**

In logistic regression, we have a set of _observations_ $\mathbf{X} = \begin{bmatrix}
x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\
x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\
\vdots & \vdots & \vdots & \vdots \\
x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)}
\end{bmatrix}$, where each row represents an observation and each column represents a feature. We have target values $\mathbf{y} = \begin{bmatrix}
y^{(1)} \\
y^{(2)} \\
\vdots \\
y^{(m)}
\end{bmatrix}$, where $y^{(i)} \in \{0, 1\}$ is the binary class label for observation $i$.

**Model**

Following the general form of supervised learning modeles in $\eqref{eq:model-supervised}$, the logistic regression model is defined as:

$$
\begin{equation} \label{eq:logistic-regression}
\hat{y}^{(i)}  = f_{\theta}(\mathbf{x}^{(i)}) = \sigma(\theta^T \mathbf{x}^{(i)}),
\end{equation}
$$

where $\hat{y}^{(i)}$ is the predicted probability that observation $i$ belongs to class $1$, and $f_{\theta}(\mathbf{x}^{(i)})$ is the hypothesis function of logistic regression, defined as:

$$
\begin{equation} \label{eq:logistic-hypothesis}
f_{\theta}(\mathbf{x}^{(i)}) = \sigma(\theta^T \mathbf{x}^{(i)}) = \frac{1}{1 + e^{-\theta^T \mathbf{x}^{(i)}}}, \quad \text{where } \sigma(z) = \frac{1}{1 + e^{-z}}.
\end{equation}
$$

The logistic function $\sigma(z)$ is also known as the **sigmoid function**, which maps any real value to the range $(0, 1)$. The sigmoid function is used to model the probability that the dependent variable belongs to a particular category.

<blockquote class="equation">

**Sigmoid Function**:

$$
\begin{equation} \label{eq:sigmoid}
\sigma(z) = \frac{1}{1 + e^{-z}}.
\end{equation}
$$

</blockquote>

```tikz

\begin{document}

\begin{tikzpicture}[scale=1.5]

    % Draw axes
    \draw[->] (0,-0.2) -- (0,1.2) node[above] {$\sigma(z)$};

    % Plot the sigmoid function
    \draw[domain=-4:4, smooth, variable=\z, blue, thick] plot ({\z}, {1/(1 + exp(-\z))});

    % Labels at key points
    \node[below right] at (4, 0) {$z \to \infty$};
    \node[left] at (0, 1) {1};
    \node[right] at (0, 0) {0};
    \node[below left] at (-4, 0) {$-\infty \leftarrow z$};
    \node[below] at (0, 0.5) {$0.5$};
    
    % Dashed lines for asymptotes
    \draw[dashed] (-4,1) -- (4,1); % y = 1 asymptote
    \draw[dashed] (-4,0) -- (4,0); % y = 0 asymptote

    % Dashed line showing midpoint
    \draw[dashed] (0,0.5) -- (4,0.5);
    \draw[dashed] (0,0.5) -- (-4,0.5);
    \fill[blue] (0,0.5) circle (1pt); % point (0, 0.5)

\end{tikzpicture}

\end{document}

```

<div class="caption">

The sigmoid function $\sigma(z) = \frac{1}{1 + e^{-z}}$ maps any real value $z$ to the range $(0, 1)$.

</div>

We can also represent the model in matrix form as:

$$
\begin{equation} \label{eq:logistic-matrix}
\hat{\mathbf{y}} = \sigma(\mathbf{X} \mathbf{\theta}) = \begin{bmatrix}
\sigma(\mathbf{\theta}^T \mathbf{x}^{(1)}) \\
\sigma(\mathbf{\theta}^T \mathbf{x}^{(2)}) \\
\vdots \\
\sigma(\mathbf{\theta}^T \mathbf{x}^{(m)})
\end{bmatrix},
\end{equation}
$$

where $\hat{\mathbf{y}}$ is the predicted _probability vector_ for all observations. The predicted class labels are obtained by applying a threshold of $0.5$ to the predicted probabilities.

**Loss Function**

We expand on the general supervised learning loss function $\eqref{eq:loss-supervised}$ to derive the **log loss** for logistic regression:

<blockquote class="equation">

**Log Loss Function**:

$$
\begin{equation} \label{eq:log-loss}
L_{\text{log}} = \mathcal{L}(\hat{\mathbf{y}}, \mathbf{y}) = \frac{1}{m} \sum_{i=1}^{m} \left[ -y^{(i)} \log(\hat{y}^{(i)}) - (1 - y^{(i)}) \log(1 - \hat{y}^{(i)}) \right].
\end{equation}
$$

</blockquote>

where $y^{(i)}$ is the actual class label for observation $i$, and $\hat{y}^{(i)}$ is the predicted probability that the observation belongs to class $1$.

<blockquote class="note">

In most ML equations, we use $\log$ to denote the natural logarithm (base $e$).

</blockquote>

We can visualize the log loss function for binary classification problems using the following plot:

```desmos
f(x) = -\ln(x)
g(x) = -\ln(1 - x)
x = 0.8
```

We further analyze $\eqref{eq:log-loss}$ by breaking down the components:

- $y^{(i)}$: The true label of the data point. This acts as the "weight" for the negative log term. If $y^{(i)} = 1$, the negative log term is weighted, and if $y^{(i)} = 0$, the positive log term is weighted.
- $-\log(\hat{y}^{(i)})$: The negative log term. This term is small when the predicted probability $\hat{y}^{(i)}$ is close to $1$, which means the prediction is confident and crrect. As $\hat{y}^{(i)}$ approaches $0$, the negative log term increases rapidly, penalizing the model for incorrect predictions.
- $(1 - y^{(i)})$: This represents the "weight" for the positive log term. If $y^{(i)} = 0$, the positive log term is weighted, and if $y^{(i)} = 1$, the negative log term is weighted.
- $\log(1 - \hat{y}^{(i)})$: The positive log term. This term is small when the predicted probability $\hat{y}^{(i)}$ is close to $0$, reflecting a confident and correct prediction for class $0$. However, as $\hat{y}^{(i)}$ approaches $1$, the positive log term increases rapidly, penalizing the model for incorrect predictions.

For example, if we have $y^{(i)} = 1$ and $\hat{y}^{(i)} = 0.8$, we have:

$$
\begin{align*}
L_{\text{log}} &= -1 \log(0.8) - (1 - 1) \log(1 - 0.8) = -1 \log(0.8) - 0 \log(0.2) \approx 0.2231.
\end{align*}
$$

On the other hand, if the true label is $y^{(i)} = 0$, and we predict $\hat{y}^{(i)} = 0.8$, we have:

$$
\begin{align*}
L_{\text{log}} &= -0 \log(0.8) - (1 - 0) \log(1 - 0.8) = 0 \log(0.8) - 1 \log(0.2) \approx 1.6094.
\end{align*}
$$

**Optimization**

To optimize the logistic regression model, we perform gradient descent on the log loss function $\eqref{eq:log-loss}$.

### Support Vector Machines (SVM)

## Unsupervised Learning

### Clustering

## Reinforcement Learning
