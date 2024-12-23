# **Machine Learning**

```component

{
    componentName: "LastUpdated"
}

```

<span class="subtitle">

Fall 2024 | Author: Brandon Y. Yang

Based on [CS 4774](https://www.cs.virginia.edu/~nn4pj/teaching) taught by [Prof. Rich Nguyen](https://www.cs.virginia.edu/~nn4pj/) at the [University of Virginia](https://engineering.virginia.edu/department/computer-science).

I am a Teaching Assistant for this course and actively taking notes to support students' learning. These notes are meant to be a supplement to the course material and are not intended to be standalone resources.

P.S. This is a work in progress. Please continue to check for updates!

Please contact me at [branyang@virginia.edu](mailto:branyang@virginia.edu) if you would like to contribute to this project!

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

**Objective**

The objective of linear regression is to find the optimal parameter vector $\theta$ that minimizes the loss function. Recall that a loss function is used to _evaluate_ the model's performance. Expanding on $\eqref{eq:loss-supervised}$, we define **mean squared error (MSE)**, a common loss function used in linear regression:

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

Recall that the optimization step aims to find the optimal parameter vector $\theta$ that minimizes the loss function $L_{\text{MSE}}$ in linear regression. There are a few ways to minimize $L_{\text{MSE}}$ in linear regression. The most common methods are:

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

**Interactive Example**

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

**Objective**

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

To optimize the logistic regression model, we perform gradient descent on the log loss function $\eqref{eq:log-loss}$. Unlike linear regression, logistic regression does not have a closed-form solution.

We expand $\eqref{eq:gd}$ to derive the gradient descent update rule for logistic regression:

$$
\begin{equation} \label{eq:gd-logistic}
\mathbf{\theta}^{(t+1)} = \mathbf{\theta}^{(t)} - \alpha \nabla_{\mathbf{\theta}} L_{\text{log}}.
\end{equation}
$$

The gradient of the log loss function with respect to the parameter vector $\mathbf{\theta}$ is given by:

<blockquote class="equation">

**Gradient of Log Loss**:

$$
\begin{equation} \label{eq:log-loss-gradient}
\nabla_{\mathbf{\theta}} L_{\text{log}} = \frac{1}{m} \mathbf{X}^T (\sigma(\mathbf{X} \mathbf{\theta}) - \mathbf{y}).
\end{equation}
$$

</blockquote>

<details><summary>Derivation of Log Loss Gradient</summary>

To derive $\eqref{eq:log-loss-gradient}$, we start by computing the gradient of the log loss with respect to a single parameter $\theta_j$:

$$
\begin{align}
    \frac{\partial L_{\text{log}}}{\partial \theta_j} =  \frac{\partial}{\partial \theta_j} \left( \frac{1}{m} \sum_{i=1}^{m} \left[ -y^{(i)} \log(\hat{y}^{(i)}) - (1 - y^{(i)}) \log(1 - \hat{y}^{(i)}) \right] \right).
\end{align}
$$

Note that $\frac{\partial}{\partial x} \left( \sum_{i=1}^{n} f(x) \right) = \sum_{i=1}^{n} \frac{\partial f(x)}{\partial x}$. Therefore, we first compute the derivative of the log loss with respect to a single observation $i$:

$$
\begin{align}
    \frac{\partial L^{(i)}_{\text{log}}}{\partial \theta_j} &= \frac{\partial}{\partial \theta_j} \left(-y^{(i)} \log(\hat{y}^{(i)}) - (1 - y^{(i)}) \log(1 - \hat{y}^{(i)}) \right) \\
    &= \frac{\partial}{\partial \theta_j} \left(-y^{(i)} \log(\sigma(\theta^T \mathbf{x}^{(i)})) - (1 - y^{(i)}) \log(1 - \sigma(\theta^T \mathbf{x}^{(i)})) \right) \\
    &= -y^{(i)} \frac{\partial}{\partial \theta_j} \log(\sigma(\theta^T \mathbf{x}^{(i)})) - (1 - y^{(i)}) \frac{\partial}{\partial \theta_j} \log(1 - \sigma(\theta^T \mathbf{x}^{(i)})) \\
    &= -y^{(i)} \frac{1}{\sigma(\theta^T \mathbf{x}^{(i)})} \frac{\partial}{\partial \theta_j} \sigma(\theta^T \mathbf{x}^{(i)}) - (1 - y^{(i)}) \frac{1}{1 - \sigma(\theta^T \mathbf{x}^{(i)})} \frac{\partial}{\partial \theta_j} (1 - \sigma(\theta^T \mathbf{x}^{(i)})) \label{eq:log-loss-gradient-step1}.
\end{align}
$$

To continue, we recognize that:

$$
\frac{\partial}{\partial \theta_j}\left(1 - \sigma(\theta^T \mathbf{x}^{(i)})  \right) = -\frac{\partial}{\partial \theta_j} \sigma(\theta^T \mathbf{x}^{(i)}).
$$

Therefore, the second term in $\eqref{eq:log-loss-gradient-step1}$ becomes:

$$

- (1 - y^{(i)}) \frac{1}{1 - \sigma(\theta^T \mathbf{x}^{(i)})} \frac{\partial}{\partial \theta_j} (1 - \sigma(\theta^T \mathbf{x}^{(i)})) = (1 - y^{(i)}) \frac{1}{1 - \sigma(\theta^T \mathbf{x}^{(i)})} \frac{\partial}{\partial \theta_j} \sigma(\theta^T \mathbf{x}^{(i)}).

$$

Now, we can combine both terms in $\eqref{eq:log-loss-gradient-step1}$:

$$
\begin{align}
    \frac{\partial L^{(i)}_{\text{log}}}{\partial \theta_j} &= -y^{(i)} \frac{1}{\sigma(\theta^T \mathbf{x}^{(i)})} \frac{\partial}{\partial \theta_j} \sigma(\theta^T \mathbf{x}^{(i)}) + (1 - y^{(i)}) \frac{1}{1 - \sigma(\theta^T \mathbf{x}^{(i)})} \frac{\partial}{\partial \theta_j} \sigma(\theta^T \mathbf{x}^{(i)}) \\
    &= \left(  \frac{-y^{(i)}}{\sigma(\theta^T \mathbf{x}^{(i)})}  + \frac{(1 - y^{(i)})}{1 - \sigma(\theta^T \mathbf{x}^{(i)})} \right)\frac{\partial}{\partial \theta_j} \sigma(\theta^T \mathbf{x}^{(i)}) \label{eq:log-loss-gradient-step2}.
\end{align}
$$

Next, we compute the derivative of the sigmoid function $\sigma(z)$ with respect to $z$:

$$
\begin{align}
    \frac{\partial}{\partial z} \sigma(z) &= \frac{\partial}{\partial z} \frac{1}{1 + e^{-z}} = \frac{e^{-z}}{(1 + e^{-z})^2} = \frac{1}{1 + e^{-z}} \left(1 - \frac{1}{1 + e^{-z}}\right) \\
    &= \sigma(z) (1 - \sigma(z)) \label{eq:sigmoid-derivative}.
\end{align}
$$

Finally, we substitute $\eqref{eq:sigmoid-derivative}$ into the gradient multiplication term in $\eqref{eq:log-loss-gradient-step2}$:

$$
\begin{align*}
    \frac{\partial}{\partial \theta_j} \sigma(\theta^T \mathbf{x}^{(i)}) = \sigma(\theta^T \mathbf{x}^{(i)}) (1 - \sigma(\theta^T \mathbf{x}^{(i)})) \frac{\partial}{\partial \theta_j} (\theta^T \mathbf{x}^{(i)}) = \sigma(\theta^T \mathbf{x}^{(i)}) (1 - \sigma(\theta^T \mathbf{x}^{(i)})) x_j^{(i)}.
\end{align*}
$$

Let $\hat{y}^{(i)} = \sigma(\theta^T \mathbf{x}^{(i)})$ for simplicity, we have:

$$
\begin{align*}
\frac{\partial L^{(i)}_{\text{log}}}{\partial \theta_j} &=  \left(  \frac{-y^{(i)}}{\sigma(\theta^T \mathbf{x}^{(i)})}  + \frac{(1 - y^{(i)})}{1 - \sigma(\theta^T \mathbf{x}^{(i)})} \right)\frac{\partial}{\partial \theta_j} \sigma(\theta^T \mathbf{x}^{(i)}) \\
&= \left(  \frac{-y^{(i)}}{\hat{y}^{(i)}}  + \frac{(1 - y^{(i)})}{1 - \hat{y}^{(i)}} \right) \hat{y}^{(i)} (1 -\hat{y}^{(i)}) x_j^{(i)} \\
&= \left(  -y^{(i)}(1 - \hat{y}^{(i)}) + (1 - y^{(i)})\hat{y}^{(i)} \right) x_j^{(i)} \\
&= \left(  -y^{(i)} + y^{(i)}\hat{y}^{(i)} + \hat{y}^{(i)} - y^{(i)}\hat{y}^{(i)} \right) x_j^{(i)} \\
&= \left(  \hat{y}^{(i)} - y^{(i)} \right) x_j^{(i)}.
\end{align*}
$$

Next, we add back the summation over all observations $i$ to obtain the gradient of the log loss function with respect to the parameter vector $\theta_j$:

$$
\begin{align}
    \frac{\partial L_{\text{log}}}{\partial \theta_j} &= \frac{1}{m} \sum_{i=1}^{m} \left(  \hat{y}^{(i)} - y^{(i)} \right) x_j^{(i)} \label{eq:log-loss-gradient-final}.
\end{align}
$$

Finally, to compute the gradient of the log loss function with respect to the parameter vector $\mathbf{\theta}$, we stack the gradients with respect to each parameter $j$ into a vector:

$$
\nabla_{\mathbf{\theta}} L_{\text{log}} = \begin{bmatrix}
\frac{\partial L_{\text{log}}}{\partial \theta_0} \\
\frac{\partial L_{\text{log}}}{\partial \theta_1} \\
\vdots \\
\frac{\partial L_{\text{log}}}{\partial \theta_n}
\end{bmatrix} = \begin{bmatrix}
\frac{1}{m} \sum_{i=1}^{m} \left(  \hat{y}^{(i)} - y^{(i)} \right) x_0^{(i)}\\
\frac{1}{m} \sum_{i=1}^{m} \left(  \hat{y}^{(i)} - y^{(i)} \right) x_1^{(i)} \\
\vdots \\
\frac{1}{m} \sum_{i=1}^{m} \left(  \hat{y}^{(i)} - y^{(i)} \right) x_n^{(i)}
\end{bmatrix} = \frac{1}{m} \mathbf{X}^T (\hat{\mathbf{y}} - \mathbf{y}),
$$

where $\hat{\mathbf{y}} = \sigma(\mathbf{X} \mathbf{\theta})$ is the predicted probability vector for all observations.

</details>

The GD algorithm for logistic regression is as follows:

1. Initialize the parameter vector $\mathbf{\theta}$.
2. Compute the predicted probabilities $\hat{\mathbf{y}} = \sigma(\mathbf{X} \mathbf{\theta})$.
3. Compute the gradient of the log loss function $\eqref{eq:log-loss-gradient}$.
4. Update the parameter vector using the GD update rule $\eqref{eq:gd-logistic}$.
5. Repeat steps 2-4 until convergence.

<details><summary>Logistic Regression Example</summary>

In this example, we randomly generate $\mathbf{X}$ in a 2D plane and assign binary class labels based on a linear boundary with some noise. We also add a bias term to $\mathbf{X}$ to account for the intercept term in logistic regression. We then apply gradient descent to find the optimal parameter vector $\mathbf{\theta}$ that minimizes the log loss function.

To compute the decision boundary in 2D space, we simply need to find the line where the predicted probability $\hat{y} = 0.5$. Using the sigmoid function $\eqref{eq:sigmoid}$, we have:

$$
\begin{align*}
\sigma(\mathbf{X} \mathbf{\theta}) &= 0.5 \\
\frac{1}{1 + e^{-\mathbf{X} \mathbf{\theta}}} &= 0.5 \\
1 &= 0.5 + 0.5 e^{-\mathbf{X} \mathbf{\theta}} \\
0.5 &= 0.5 e^{-\mathbf{X} \mathbf{\theta}} \\
1 &= e^{-\mathbf{X} \mathbf{\theta}} \\
\ln(1) &= \ln(e^{-\mathbf{X} \mathbf{\theta}}) \\
0 &= -\mathbf{X} \mathbf{\theta} \\
\mathbf{X} \mathbf{\theta} &= 0.
\end{align*}
$$

Therefore, the decision boundary is the line where $\mathbf{X} \mathbf{\theta} = 0$. In this example, we have $\mathbf{\theta} = \begin{bmatrix}
\theta_0 & \theta_1 & \theta_2
\end{bmatrix}$, where $\theta_0$ is the intercept term and $\theta_1$ and $\theta_2$ are the coefficients for the features $x_1$ and $x_2$. The decision boundary is the line where $\theta_0 + \theta_1 x_1 + \theta_2 x_2 = 0$. Therefore, we can solve for $x_2$ to get the equation of the decision boundary:

$$
\begin{align*}
\theta_0 + \theta_1 x_1 + \theta_2 x_2 &= 0 \\
\theta_2 x_2 &= -\theta_0 - \theta_1 x_1 \\
x_2 &= \frac{-\theta_0 - \theta_1 x_1}{\theta_2}.
\end{align*}
$$

```execute-python

import numpy as np
import matplotlib.pyplot as plt

# Generate labels based on a linear boundary (randomly chosen)
def generate_labels(X, noise_fraction=0.2):
    y = (X[:, 0] + X[:, 1] > 0).astype(int).reshape(m, 1)
    num_noisy_points = int(noise_fraction * m)
    flip_indices = np.random.choice(
        m, num_noisy_points, replace=False
    )  # Randomly select points
    y[flip_indices] = 1 - y[flip_indices]  # Flip the labels (0 -> 1, 1 -> 0)
    return y

# Sigmoid function
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# Log loss (cross-entropy loss) function
def compute_log_loss(X_b, y, theta):
    m = len(y)
    predictions = sigmoid(X_b.dot(theta))
    log_loss = (1 / m) * np.sum(
        -y * np.log(predictions) - (1 - y) * np.log(1 - predictions)
    )
    return log_loss

# Generate random data for binary classification on a 2D plane
np.random.seed(42)
m = 100  # Number of examples
X = 2 * np.random.rand(m, 2) - 1  # Random features in 2D plane (-1 to 1 range)
y = generate_labels(X, noise_fraction=0.2)

# Add bias term (column of 1s) to X
X_b = np.c_[np.ones((m, 1)), X]

# Initialize parameters (theta) randomly
theta = np.random.randn(3, 1)

# Learning rate and iteration parameters
alpha = 0.1
n_iterations = 1000
tolerance = 1e-10

# Gradient Descent with termination condition
loss_values = []

for iteration in range(n_iterations):
    # Predictions (probabilities)
    y_hat = sigmoid(X_b.dot(theta))
    # Log loss
    loss = compute_log_loss(X_b, y, theta)
    # Gradients for log loss
    error = y_hat - y
    gradients = (1 / m) * X_b.T.dot(error)
    # Update parameters
    theta -= alpha * gradients
    # Save loss value
    loss_values.append(loss)

    # Termination condition
    if iteration > 0 and np.abs(loss_values[-1] - loss_values[-2]) < tolerance:
        break

# Final loss
print("Final Loss (Log Loss):", loss_values[-1])

plt.figure(figsize=(10, 5))

# Plotting the data points and decision boundary
plt.subplot(1, 2, 1)
plt.scatter(X[y.flatten() == 0, 0], X[y.flatten() == 0, 1], color="b", label="Class 0")
plt.scatter(X[y.flatten() == 1, 0], X[y.flatten() == 1, 1], color="r", label="Class 1")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.title("2D Classification")
plt.legend()

# Decision boundary
x_values = np.array([-1, 1])
y_values = -(theta[0] + theta[1] * x_values) / theta[2]
plt.plot(x_values, y_values, color="g", label="Decision Boundary")
plt.legend()

# Plotting the loss curve
plt.subplot(1, 2, 2)
plt.plot(loss_values)
plt.xlabel("Iteration")
plt.ylabel("Log Loss")
plt.title("Log Loss Curve")

plt.tight_layout()

get_image(plt)

```

</details>

<blockquote class="note">

Similar to linear regression, we should always add a bias term (intercept term) to the input features in logistic regression.

</blockquote>

```component

{
    componentName: "logisticRegression"
}

```

#### Softmax Regression (Multinomial Logistic Regression)

Softmax regression is a **classification** algorithm that generalizes logistic regression to **multi-class classification** problems. In softmax regression, the model predicts the probability that an observation belongs to each class, and the class with the highest probability is selected as the predicted class label.

**Data Representation**

In softmax regression, we have a set of _observations_ $\mathbf{X} = \begin{bmatrix}
x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\
x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\
\vdots & \vdots & \vdots & \vdots \\
x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)}
\end{bmatrix}$, where each row represents an observation and each column represents a feature. We have target values $\mathbf{y} = \begin{bmatrix}
y^{(1)} \\
y^{(2)} \\
\vdots \\
y^{(m)}
\end{bmatrix}$, where $y^{(i)} \in \{1, 2, \dots, K\}$ is the class label for observation $i$, and $K$ is the number of classes.

In addition, we can also define the one-hot encoded target matrix $\mathbf{Y} \in \mathbb{R}^{m \times K}$, where each row represents the one-hot encoded class label for an observation. The one-hot encoded matrix $\mathbf{Y}$ has the following properties:

$$
\begin{align*}
\mathbf{Y}_{ij} &=
\begin{cases}
1, & \text{if observation } i \text{ belongs to class } j, \\
0, & \text{otherwise}.
\end{cases}
\end{align*}
$$

**Model**

Following the general form of supervised learning models in $\eqref{eq:model-supervised}$, the softmax regression model is defined as:

$$
\begin{equation} \label{eq:softmax-regression}
\hat{\mathbf{y}}^{(i)} = f_{\Theta}(\mathbf{x}^{(i)}) = \text{softmax}(\Theta^T \mathbf{x}^{(i)}),
\end{equation}
$$

where $\hat{\mathbf{y}}^{(i)}$ is a $K$-dimensional vector representing the predicted probabilities for each class for observation $i$, $\Theta \in \mathbb{R}^{n \times K}$ is the parameter matrix, and $f_{\Theta}(\mathbf{x}^{(i)})$ is the hypothesis function of softmax regression, defined as:

$$
\begin{equation} \label{eq:softmax-hypothesis}
f_{\Theta}(\mathbf{x}^{(i)})_j = P(y^{(i)} = j \mid \mathbf{x}^{(i)}; \Theta) = \frac{e^{\theta_j^T \mathbf{x}^{(i)}}}{\sum_{k=1}^K e^{\theta_k^T \mathbf{x}^{(i)}}}, \quad \text{for } j = 1, 2, \dots, K,
\end{equation}
$$

where $\theta_j$ is the parameter vector corresponding to class $j$, and $P(y^{(i)} = j \mid \mathbf{x}^{(i)}; \Theta)$ is the probability that observation $i$ belongs to class $j$.

<blockquote class="equation">

**Softmax Function**:

$$
\begin{equation} \label{eq:softmax}
\text{softmax}(\mathbf{z})_j = \frac{e^{z_j}}{\sum_{k=1}^K e^{z_k}}, \quad \text{for } j = 1, 2, \dots, K.
\end{equation}
$$

</blockquote>

The softmax function maps a real-valued $K$-dimensional vector $\mathbf{z}$ to a probability distribution over $K$ classes.

We can also represent the model in matrix form as:

$$
\begin{equation} \label{eq:softmax-matrix}
\hat{\mathbf{Y}} = \text{softmax}(\mathbf{X} \Theta) = \begin{bmatrix}
\text{softmax}(\Theta^T \mathbf{x}^{(1)}) \\
\text{softmax}(\Theta^T \mathbf{x}^{(2)}) \\
\vdots \\
\text{softmax}(\Theta^T \mathbf{x}^{(m)})
\end{bmatrix},
\end{equation}
$$

where $\hat{\mathbf{Y}} \in \mathbb{R}^{m \times K}$ is the matrix of predicted probabilities for all observations.

The predicted class labels are obtained by selecting the class with the highest predicted probability:

$$
\begin{equation} \label{eq:softmax-prediction}
\hat{y}^{(i)} = \arg\max_{j} \hat{\mathbf{y}}^{(i)}_j, \quad \text{for } i = 1, 2, \dots, m,
\end{equation}
$$

where $\hat{\mathbf{y}}^{(i)}_j$ is the predicted probability that observation $i$ belongs to class $j$.

**Objective**

We extend the general supervised learning loss function $\eqref{eq:loss-supervised}$ to derive the **cross-entropy loss** for softmax regression:

<blockquote class="equation">

**Cross-Entropy Loss Function**:

$$
\begin{equation} \label{eq:cross-entropy-loss}
L_{\text{CE}} = \mathcal{L}(\hat{\mathbf{Y}}, \mathbf{Y}) = -\frac{1}{m} \sum_{i=1}^{m} \sum_{j=1}^{K} y^{(i)}_j \log(\hat{y}^{(i)}_j),
\end{equation}
$$

</blockquote>

where $y^{(i)}_j$ is the actual label indicator for observation $i$ and class $j$, defined as:

$$
y^{(i)}_j =
\begin{cases}
1, & \text{if observation } i \text{ belongs to class } j, \\
0, & \text{otherwise},
\end{cases}
$$

and $\hat{y}^{(i)}_j$ is the predicted probability that observation $i$ belongs to class $j$. The cross-entropy loss function measures the difference between the predicted probabilities and the actual labels. The loss is minimized when the predicted probabilities are close to the actual labels.

<details><summary>Derivation of Cross-Entropy Loss</summary>

We can derive $\eqref{eq:cross-entropy-loss}$ from the general form of log loss $\eqref{eq:log-loss}$ by extending it to multi-class classification problems.

Starting with the $\eqref{eq:log-loss}$ for binary classification, where $y^{(i)} \in \{0, 1\}$ is the true label for observation $i$, and $\hat{y}^{(i)}$ is the predicted probability that $y^{(i)} = 1$.

In binary classification, we can represent the true labels using one-hot encoding:

- Let $y^{(i)}_0 = 1$ if $y^{(i)} = 0$, else $y^{(i)}_0 = 0$.
- Let $y^{(i)}_1 = 1$ if $y^{(i)} = 1$, else $y^{(i)}_1 = 0$.

Since $y^{(i)}$ is binary, we have:

$$
y^{(i)}_0 = 1 - y^{(i)}, \quad y^{(i)}_1 = y^{(i)}.
$$

Similarly, we define the predicted probabilities for each class:

- $\hat{y}^{(i)}_0 = 1 - \hat{y}^{(i)}$, the predicted probability that $y^{(i)} = 0$.
- $\hat{y}^{(i)}_1 = \hat{y}^{(i)}$, the predicted probability that $y^{(i)} = 1$.

Substituting these into the log loss function:

$$
\begin{align*}
L_{\text{log}} &= -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)}_1 \log(\hat{y}^{(i)}_1) + y^{(i)}_0 \log(\hat{y}^{(i)}_0) \right] \\
&= -\frac{1}{m} \sum_{i=1}^{m} \sum_{j=0}^{1} y^{(i)}_j \log(\hat{y}^{(i)}_j).
\end{align*}
$$

For multi-class classification with $K$ classes, where $y^{(i)} \in \{1, 2, \dots, K\}$:

- We use one-hot encoding for the true labels:

$$
y^{(i)}_j =
\begin{cases}
1, & \text{if } y^{(i)} = j, \\
0, & \text{otherwise},
\end{cases}
\quad \text{for } j = 1, 2, \dots, K.
$$

- $\hat{y}^{(i)}_j$ is the predicted probability that $y^{(i)} = j$.

The cross-entropy loss function is then defined as:

$$
\begin{equation}
L_{\text{CE}} = -\frac{1}{m} \sum_{i=1}^{m} \sum_{j=1}^{K} y^{(i)}_j \log(\hat{y}^{(i)}_j).
\end{equation}
$$

We can also clearly see how the binary log loss function $\eqref{eq:log-loss}$ generalizes to the cross-entropy loss function $\eqref{eq:cross-entropy-loss}$ for multi-class classification problems. When $K = 2$, the cross-entropy loss function reduces to the binary log loss function:

$$
\begin{align*}
L_{\text{CE}} &= -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)}_1 \log(\hat{y}^{(i)}_1) + y^{(i)}_0 \log(\hat{y}^{(i)}_0) \right] \\
&= L_{\text{log}}.
\end{align*}
$$

Thus, the cross-entropy loss is a generalization of the binary log loss to $K$ classes.

</details>

**Optimization**

To optimize the softmax regression model, we perform gradient descent on the cross-entropy loss function $\eqref{eq:cross-entropy-loss}$. Similar to logistic regression, softmax regression does not have a closed-form solution.

We extend $\eqref{eq:gd-logistic}$ to derive the gradient descent update rule for softmax regression:

$$
\begin{equation} \label{eq:gd-softmax}
\Theta^{(t+1)} = \Theta^{(t)} - \alpha \nabla_{\Theta} L_{\text{CE}}.
\end{equation}
$$

The gradient of the cross-entropy loss function with respect to the parameter matrix $\Theta$ is given by:

<blockquote class="equation">

**Gradient of Cross-Entropy Loss**:

$$
\begin{equation} \label{eq:cross-entropy-gradient}
\nabla_{\Theta} L_{\text{CE}} = \frac{1}{m} \mathbf{X}^T (\hat{\mathbf{Y}} - \mathbf{Y}),
\end{equation}
$$

</blockquote>

where:

- $\mathbf{X} \in \mathbb{R}^{m \times n}$ is the input data matrix.
- $\hat{\mathbf{Y}} \in \mathbb{R}^{m \times K}$ is the matrix of predicted probabilities.
- $\mathbf{Y} \in \mathbb{R}^{m \times K}$ is the matrix of true labels in one-hot encoding.

The GD algorithm for softmax regression is as follows:

1. Initialize the parameter matrix $\Theta = \begin{bmatrix}
\theta_1^{(1)} & \theta_1^{(2)} & \cdots & \theta_1^{(K)} \\
\theta_2^{(1)} & \theta_2^{(2)} & \cdots & \theta_2^{(K)} \\
\vdots & \vdots & \vdots & \vdots \\
\theta_n^{(1)} & \theta_n^{(2)} & \cdots & \theta_n^{(K)}
\end{bmatrix}$.
2. Compute the predicted probabilities $\hat{\mathbf{Y}} = \text{softmax}(\mathbf{X} \Theta)$.
3. Compute the gradient of the cross-entropy loss function $\eqref{eq:cross-entropy-gradient}$.
4. Update the parameter matrix using the GD update rule $\eqref{eq:gd-softmax}$.
5. Repeat steps 2-4 until convergence.

#### Support Vector Machines (SVM)

Support Vector Machines (SVM) are a class of supervised learning models used for **classification** and **regression** tasks. In classification, SVMs find the optimal hyperplane that separates the data into different classes. The hyperplane is chosen to maximize the margin between the classes, making SVMs effective for binary classification tasks. SVMs can also be extended to multi-class classification problems using techniques such as **one-vs-all** (OvA) or **one-vs-one** (OvO) strategies. In regression, SVMs find the optimal hyperplane that best fits the data. SVMs are effective for high-dimensional data and can handle non-linear relationships using the **kernel trick**.

**Data Representation**

In SVM, we have a set of _observations_ $\mathbf{X} = \begin{bmatrix}
x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\
x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\
\vdots & \vdots & \vdots & \vdots \\
x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)}
\end{bmatrix}$, where each row represents an observation and each column represents a feature. We have target values $\mathbf{y} = \begin{bmatrix}
y^{(1)} \\
y^{(2)} \\
\vdots \\
y^{(m)}
\end{bmatrix}$, where $y^{(i)} \in \{-1, 1\}$ represents the binary class label for observation $i$.

<blockquote class="note>

In SVM, we use class labels $y^{(i)} \in \{-1, 1\}$ instead of $y^{(i)} \in \{0, 1\}$ to represent the two classes. The class labels are chosen to simplify the optimization problem.

</blockquote>

We call the class label $1$ the **positive class** and the class label $-1$ the **negative class**. In SVM, we aim to find two parallel hyperplanes, the **positive hyperplane** and the **negative hyperplane**, that separate the data into different classes. In addition, we can also derive the **maximum margin hyperplane** that lies halfway between the positive and negative hyperplanes. We first introduce the following terms:

- **Positive Hyperplane**: The hyperplane that defines the boundary for the positive class.
- **Negative Hyperplane**: The hyperplane that defines the boundary for the negative class.
- **Maximum Margin Hyperplane (Decision Boundary)**: The hyperplane that lies equidistant between the positive and negative hyperplanes, separating the two classes with the maximum margin.
- **Support Vectors**: Data points that lie _on_ on the positive/negative hyperplanes, or _closest_ to the marximum margin hyperplane.
- **Margin**: The distance between the support vectors and the decision boundary. SVM aims to maximize the margin.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*7LlsbDTwektZJvER5tWyHA.png" alt="Image" style="max-height: 400px;">

<div class="caption">

Source: [Simplifying Support Vector Machines — A Concise Introduction to Binary Classification](https://towardsdatascience.com/support-vector-machines-svm-ml-basics-machine-learning-data-science-getting-started-1683fc99cd45)

</div>

##### Linear SVM

Linear SVM is used for linearly separable data, where the classes can be separated by a straight line (in 2D) or a hyperplane (in higher dimensions).

**Model**

Following the general form of supervised learning models in $\eqref{eq:model-supervised}$, the decision function of a linear SVM is defined as:

$$
\begin{equation} \label{eq:svm-decision-function}
f_{\mathbf{w}, b}(\mathbf{x}^{(i)}) = \mathbf{w}^T \mathbf{x}^{(i)} + b,
\end{equation}
$$

where $\mathbf{w} \in \mathbb{R}^n$ is the weight vector, $\mathbf{x}^{(i)} \in \mathbb{R}^n$ is the feature vector for observation $i$, and $b \in \mathbb{R}$ is the bias term. The predicted class label $\hat{y}^{(i)}$ for observation $i$ is determined by the sign of the decision function:

$$
\begin{equation} \label{eq:svm-prediction-label}
\hat{y}^{(i)} = \text{sign}(f_{\mathbf{w}, b}(\mathbf{x}^{(i)})) = \begin{cases}
1, & \text{if } f_{\mathbf{w}, b}(\mathbf{x}^{(i)}) \geq 0, \\
-1, & \text{otherwise}.
\end{cases}
\end{equation}
$$

**Objective**

We have two different objectives(loss functions) depeneding on whether the data is linearly separable or not. **Hard-margin SVM** is used when the data is linearly separable, while **Soft-margin SVM** is used when the data is not linearly separable.

**Hard-Margin SVM (Linearly Separable Data)**

Hard-Margin SVM assumes that the data is _linearly separable_, meaning that there exists a hyperplane that perfectly separates the two classes. We first aim to find the _positive hyperplane_ and the _negative hyperplane_, which are defined by the equations:

$$
\begin{align*}
\text{positive hyperplane: } \mathbf{w}^T \mathbf{x}^{(i)} + b &= 1 \label{eq:svm-positive-hyperplane}, \\
\text{negative hyperplane: } \mathbf{w}^T \mathbf{x}^{(i)} + b &= -1. \label{eq:svm-negative-hyperplane}
\end{align*}
$$

Since we assumed that the data is linearly separable, we are _guaranteed_ that the positive and negative hyperplanes exist, and:

$$
\begin{align}
\hat{y}^{(i)} = \begin{cases}
1, & \text{if } \mathbf{w}^T \mathbf{x}^{(i)} + b \geq 1, \\
-1, & \text{if } \mathbf{w}^T \mathbf{x}^{(i)} + b \leq -1 \\
\text{undefined}, & \text{o.w.}
\end{cases} \label{eq:svm-hard-margin-prediction}.
\end{align}
$$

Therefore, the objective becomes to maximize the margin $M$ between the positive and negative hyperplanes. To find $M$, we first denote $\mathbf{x}^+$ and $\mathbf{x}^-$ as the some points on the positive and negative hyperplanes, and they are the **support vectors** for their respective classes, which means that:

$$
\begin{align}
\mathbf{w}^T \mathbf{x}^+ + b &= 1, \label{eq:svm-support-vector-plus} \\
\mathbf{w}^T \mathbf{x}^- + b &= -1 \label{eq:svm-support-vector-minus}.
\end{align}
$$

Additionally, we also assume that if we draw a line between $\mathbf{x}^+$ and $\mathbf{x}^-$, it will be perpendicular to the hyperplanes. Therefore, the distance between $\mathbf{x}^+$ and $\mathbf{x}^-$ is $M$, and we have the following formulation:

$$
\begin{align}
\mathbf{x}^+ &= \lambda \mathbf{w} + \mathbf{x}^- \label{eq:svm-support-vector-plus-lambda}, \\
M &= \left\| \mathbf{x}^+ - \mathbf{x}^- \right\| \label{eq:svm-margin},
\end{align}
$$

where $\lambda$ is a scalar value. To continue, we first find $\lambda$ by substituting $\eqref{eq:svm-support-vector-plus-lambda}$ into $\eqref{eq:svm-support-vector-plus}$:

$$
\begin{align*}
\mathbf{w}^T \left(\lambda \mathbf{w} + \mathbf{x}^-\right) + b &= 1 \\
\lambda \mathbf{w}^T \mathbf{w} + \mathbf{w}^T \mathbf{x}^- + b &= 1 \\
\lambda  \mathbf{w}^T \mathbf{w} + (-1) &= 1 \tag{\eqref{eq:svm-support-vector-minus}} \\
\lambda  \mathbf{w}^T \mathbf{w} &= 2 \\
\lambda &= \frac{2}{\mathbf{w}^T \mathbf{w}} = \frac{2}{\left\| \mathbf{w} \right\|^2}.
\end{align*}
$$

Next, we substitute $\lambda$ back into $\eqref{eq:svm-support-vector-plus-lambda}$ and $\eqref{eq:svm-margin}$ to find $M$:

$$
\begin{align*}
M &= \left\| \left(\frac{2}{\left\| \mathbf{w} \right\|^2} \mathbf{w} + \mathbf{x}^- \right) - \mathbf{x}^- \right\| = \frac{2}{\left\| \mathbf{w} \right\|}.
\end{align*}
$$

Therefore, we can compute margin $M$ as a function of the weight vector $\mathbf{w}$, and we aim to maximize $M$ by minimizing $\left\| \mathbf{w} \right\|$. In order to make the optimization problem easier, we can minimize $\frac{1}{2} \left\| \mathbf{w} \right\|^2$ instead, which is equivalent to maximizing the margin $M$.

Additionally, we have a set of constraints that we defined earlier in $\eqref{eq:svm-hard-margin-prediction}$, which states that the positive and negative hyperplanes must correctly classify the data. We can combine these constraints into a single constraint, which states that for every observation $i$, $y^{(i)} (\mathbf{w}^T \mathbf{x}^{(i)} + b) \geq 1$, since each label $y^{(i)}$ is either $1$ or $-1$.

Finally, we can combine the optimization objective and the constraints to formulate the **Hard-Margin SVM Objective**:

<blockquote class="equation">

**Hard-Margin SVM Objective**:

$$
\begin{equation} \label{eq:svm-hard-margin}
\begin{aligned}
& \underset{\mathbf{w}, b}{\text{minimize}}
& & \frac{1}{2} \left\| \mathbf{w} \right\|^2 \\
& \text{subject to}
& & y^{(i)} (\mathbf{w}^T \mathbf{x}^{(i)} + b) \geq 1, \quad \text{for } i = 1, 2, \dots, m.
\end{aligned}
\end{equation}
$$

</blockquote>

This can be solved using optimization techniques such as the **Lagrange duality** and the **Sequential Minimal Optimization (SMO)** algorithm.

<details><summary>Hard-Margin SVM Optimization</summary>

To solve the Hard-Margin SVM optimization problem $\eqref{eq:svm-hard-margin}$, we can use the **Lagrange duality** to convert the constrained optimization problem into an unconstrained optimization problem. The Lagrangian function for the Hard-Margin SVM problem is defined as:

$$
\begin{equation} \label{eq:svm-lagrangian}
\mathcal{L}(\mathbf{w}, b, \boldsymbol{\alpha}) = \frac{1}{2} \left\| \mathbf{w} \right\|^2 - \sum_{i=1}^{m} \alpha^{(i)} \left[ y^{(i)} (\mathbf{w}^T \mathbf{x}^{(i)} + b) - 1 \right],
\end{equation}
$$

where $\boldsymbol{\alpha} = \begin{bmatrix}
\alpha^{(1)} \\
\alpha^{(2)} \\
\vdots \\
\alpha^{(m)}
\end{bmatrix}$ is the vector of Lagrange multipliers. The Lagrange dual function is then defined as:

$$
\begin{equation} \label{eq:svm-lagrange-dual}
\mathcal{D}(\boldsymbol{\alpha}) = \underset{\mathbf{w}, b}{\text{min}} \mathcal{L}(\mathbf{w}, b, \boldsymbol{\alpha}).
\end{equation}
$$

The dual optimization problem is then:

$$
\begin{equation} \label{eq:svm-hard-margin-dual}
\begin{aligned}
& \underset{\boldsymbol{\alpha}}{\text{maximize}}
& & \mathcal{D}(\boldsymbol{\alpha}) = \underset{\mathbf{w}, b}{\text{min}} \mathcal{L}(\mathbf{w}, b, \boldsymbol{\alpha}) \\
& \text{subject to}
& & \alpha^{(i)} \geq 0, \quad \text{for } i = 1, 2, \dots, m.
\end{aligned}
\end{equation}
$$

The dual optimization problem $\eqref{eq:svm-hard-margin-dual}$ can be solved using optimization techniques such as the **Sequential Minimal Optimization (SMO)** algorithm.

</details>

**Soft-Margin SVM (Non-Linearly Separable Data)**

Coming soon...

##### Non-Linear SVM

Coming soon...

## Unsupervised Learning

<blockquote class="definition">

Unsupervised learning is a category of machine learning that uses **unlabeled** data to discover patterns or relationships within the data without explicit supervision.

</blockquote>

In contrast to supervised learning, where the model predicts a target feature, unsupervised learning focuses on identifying hidden structures in the data. We can narrow down the components of unsupervised learning:

- **Model**: In unsupervised learning, the model does not predict a target value but instead aims to find patterns or groupings within the input features. There are two main types of models:
  - **Clustering**: Models that group data points into clusters based on similarity.
  - **Dimensionality Reduction**: Models that reduce the number of input features while preserving the essential structure of the data.

  In general, the model can be represented as:

  $$
  \begin{equation} \label{eq:model-unsupervised}
  \mathbf{z} = f_{\theta}(\mathbf{x}),
  \end{equation}
  $$

  where $\mathbf{z}$ is the _learned representation_ or _cluster assignment_, $\mathbf{x}$ is the input feature vector, and $\theta$ is the parameter vector of the model.

- **Objective**: In unsupervised learning, the objective is to identify a structure or representation of the data that captures the underlying patterns. Since there is no true label $\mathbf{y}$, the objective is to minimize a different type of _loss function_:

  $$
  \begin{equation} \label{eq:loss-unsupervised}
  L = \mathcal{L}(\mathbf{z}, \mathbf{x}),
  \end{equation}
  $$

  where $\mathbf{z}$ represents the model's output (e.g., cluster assignments or reduced features) and $\mathbf{x}$ is the original input data.

- **Optimization**: Similar to supervised learning, the optimization step aims to find the parameter vector $\theta$ that minimizes the unsupervised loss function described in $\eqref{eq:loss-unsupervised}$.

### Clustering

Clustering is a type of unsupervised learning that groups data points into clusters based on their similarity. The goal of clustering is to identify natural groupings in the data without any prior knowledge of the true labels. Clustering algorithms can help discover patterns, structure, or relationships within the data.

#### K-Means Clustering

K-Means clustering is an unsupervised learning algorithm that partitions the data into **K clusters**, where each data point belongs to the cluster with the nearest centroid. It is commonly used for clustering tasks to find patterns or groupings in data without labeled outcomes.

**Data Representation**

In K-Means clustering, we have a set of _observations_ $\mathbf{X} = \begin{bmatrix}
x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\
x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\
\vdots & \vdots & \vdots & \vdots \\
x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)}
\end{bmatrix}$, where each row represents an observation and each column represents a feature. Unlike supervised learning, there are no target labels $\mathbf{y}$. The goal is to partition the observations into $K$ clusters based on their feature values.

**Model**

The K-Means model assigns each observation to one of $K$ clusters. Each cluster is defined by a **centroid** $\mu_k \in \mathbb{R}^n$, which is the mean feature vector of all observations assigned to that cluster. To assign an observation $\mathbf{x}^{(i)}$ to a cluster, we find the nearest centroid based on some distance metric:

$$
\begin{equation} \label{eq:kmeans-model}
c^{(i)} = \arg\min_k D(\mathbf{x}^{(i)}, \mu_k),
\end{equation}
$$

where $c^{(i)}$ is the cluster assignment for observation $i$, $\mathbf{x}^{(i)}$ is the feature vector of the observation, $\mu_k$ is the centroid of cluster $k$, and $D(\cdot, \cdot)$ is the distance metric.

**Distance Metric**

We represent the distance function as $D: \mathbb{R}^n \times \mathbb{R}^n \rightarrow \mathbb{R}$, which measures the _distance_ between two vectors. There are multiple ways to formulate the distance metrid.

**Euclidean Distance**:

$$
\begin{equation} \label{eq:euclidean-distance}
D(\mathbf{x}, \mathbf{y}) = \|\mathbf{x} - \mathbf{y}\|_2 = \sqrt{\sum_{i=1}^{n} (x_i - y_i)^2}.
\end{equation}
$$

**Manhattan Distance**:

$$
\begin{equation} \label{eq:manhattan-distance}
D(\mathbf{x}, \mathbf{y}) = \|\mathbf{x} - \mathbf{y}\|_1 = \sum_{i=1}^{n} |x_i - y_i|.
\end{equation}
$$

**Minkowski Distance**:

$$
\begin{equation} \label{eq:minkowski-distance}
D(\mathbf{x}, \mathbf{y}) = \left( \sum_{i=1}^{n} |x_i - y_i|^p \right)^{1/p}.
\end{equation}
$$

Note that the Euclidean distance is the $L_2$ norm, the Manhattan distance is the $L_1$ norm, and the Minkowski distance is a generalization of both metrics.

**Cosine Similarity**:

$$
\begin{equation} \label{eq:cosine-similarity}
D(\mathbf{x}, \mathbf{y}) = 1 - \frac{\mathbf{x} \cdot \mathbf{y}}{\|\mathbf{x}\|_2 \|\mathbf{y}\|_2} = 1 - \frac{\sum_{i=1}^{n} x_i y_i}{\sqrt{\sum_{i=1}^{n} x_i^2} \sqrt{\sum_{i=1}^{n} y_i^2}}.
\end{equation}
$$

The choice of distance metric can affect the clustering results, as different metrics capture different notions of similarity between data points.

**Objective**

The objective of K-Means clustering is to minimize the _within-cluster sum of squares_ (WCSS), also known as the **inertia**. The WCSS measures the distance between each data point and its assigned cluster centroid:

<blockquote class="equation">

**K-Means Loss Function (Within-Cluster Sum of Squares)**:

$$
\begin{equation} \label{eq:kmeans-loss}
L_{\text{WCSS}} = \mathcal{L}(C, \mu) = \sum_{k=1}^{K} \sum_{\mathbf{x}^{(i)} \in C_k} D(\mathbf{x}^{(i)}, \mu_k)^2,
\end{equation}
$$

</blockquote>

where:

- $C = \{C_1, C_2, \dots, C_K\}$ is the set of clusters, and $C_k = \{\mathbf{x}^{(i)} \mid c^{(i)} = k\}$ is the set of data points assigned to cluster $k$.
- $\mu = \{\mu_1, \mu_2, \dots, \mu_K\}$ is the set of cluster centroids.
- $D(\mathbf{x}^{(i)}, \mu_k)$ is the distance between observation $\mathbf{x}^{(i)}$ and centroid $\mu_k$.

**Optimization**

The K-Means algorithm iteratively optimizes the cluster assignments and centroids using the following steps:

1. **Initialization**: Randomly initialize the cluster centroids $\mu = \{\mu_1, \mu_2, \dots, \mu_K\}$ by selecting $K$ points from the dataset or using a method like [K-Means++](https://en.wikipedia.org/wiki/K-means%2B%2B).

2. **Cluster Assignment**: For each observation $\mathbf{x}^{(i)}$, assign it to the cluster with the nearest centroid using $\eqref{eq:kmeans-model}$.

3. **Centroid Update**: After all data points are assigned to clusters, update each cluster centroid $\mu_k$ by taking the mean of all data points assigned to that cluster:

   $$
   \begin{equation} \label{eq:kmeans-update}
   \mu_k = \frac{1}{|C_k|} \sum_{\mathbf{x}^{(i)} \in C_k} \mathbf{x}^{(i)},
    \end{equation}
   $$

    where $|C_k|$ is the number of data points in cluster $k$.

4. **Convergence Check**: Repeat steps 2 and 3 until the centroids no longer change (or change by less than a small threshold) or a maximum number of iterations is reached.

The K-Means optimization can be summarized as:

- The **cluster assignment** step minimizes the distance between data points and their nearest centroids.
- The **centroid update** step recalculates the centroids as the mean of the assigned points.
- The algorithm converges when the cluster assignments stabilize or the centroids no longer move significantly.

<details><summary>K-Means Clustering Example</summary>

In this example, we generate random data points in a 2D plane and apply K-Means clustering to group them into 3 clusters. We initialize the centroids randomly and use the algorithm to iteratively update the cluster assignments and centroids.

```execute-python

import numpy as np
import matplotlib.pyplot as plt

# Generate random data points in 2D (manually)
np.random.seed(42)
m = 300  # Number of examples
X = np.random.randn(m, 2) * 0.6  # Adjust cluster spread
X[:100] += [2, 2]  # Shift cluster 1
X[100:200] += [-2, -2]  # Shift cluster 2
X[200:] += [2, -2]  # Shift cluster 3

# Number of clusters
K = 3

# Initialize centroids randomly from the data points
centroids = X[np.random.choice(X.shape[0], K, replace=False)]

# Function to compute the distance between points and centroids
def compute_distances(X, centroids):
    return np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)

# Function to assign clusters
def assign_clusters(X, centroids):
    distances = compute_distances(X, centroids)
    return np.argmin(distances, axis=1)

# Function to update centroids
def update_centroids(X, labels, K):
    return np.array([X[labels == k].mean(axis=0) for k in range(K)])

# Run K-Means algorithm
max_iterations = 100
for i in range(max_iterations):
    labels = assign_clusters(X, centroids)
    new_centroids = update_centroids(X, labels, K)
    
    # If centroids do not change, stop the algorithm
    if np.all(centroids == new_centroids):
        break
    
    centroids = new_centroids

# Plotting the results
plt.scatter(X[:, 0], X[:, 1], c=labels, s=50, cmap='viridis')
plt.scatter(centroids[:, 0], centroids[:, 1], s=200, c='red', label='Centroids')
plt.title("K-Means Clustering")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.legend()

get_image(plt)

```

## Reinforcement Learning

Coming soon...

## Citation

Thank you for reading my notes! If you find them useful or reference them in your work, please consider citing them as follows:

**Text Citation:**

```txt
Yang, Brandon Y. (October 2024). Machine Learning. Brandon's Notes. Retrieved from https://www.brandonyifanyang.com/notes/ml
```

**BibTeX Entry:**

```bibtex
@misc{yang2024ml,
    author = {Yang, Brandon Y.},
    title = {Machine Learning},
    howpublished = {\url{https://www.brandonyifanyang.com/notes/ml}},
    year = {2024},
    month = {October},
    note = {Brandon's Notes}
}
```
