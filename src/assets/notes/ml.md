# **Machine Learning**

<span class="subtitle">
Date: 5/1/2024 | Author: Brandon Yang
</span>

## Supervised Learning

<blockquote class="definition">

Supervised learning is a category of machine learning that uses **labeled** data to train algorithms to predict outcomes and recognize patterns.

</blockquote>

Supervised learning in machine learning is generally divided into two categories: **regression** and **classification**.

### Regression

#### Linear Regression

In linear regression, we aim to find the best-fitting straight line through the data points.

##### Data Representation

Given a set of observations $\mathbf{X} = \begin{bmatrix}
\mathbf{x}^{(1)} \\
\mathbf{x}^{(2)} \\
\vdots \\
\mathbf{x}^{(m)}
\end{bmatrix}$, where each $\mathbf{x}^{(i)}$ is a feature vector, and a set of corresponding target values (aka. labels) $\mathbf{y} = \begin{bmatrix}
y^{(1)} \\
y^{(2)} \\
\vdots \\
y^{(m)}
\end{bmatrix}$, we aim to find a parameter vector $\mathbf{\theta}$ that minimizes the difference between the predicted values and the actual values.

To compute the predicted values given the parameter vector $\mathbf{\theta}$, we define the **hypothesis function** as:

$$
\hat{y} = h_{\mathbf{\theta}}(\mathbf{x}) = \mathbf{\theta}^T \mathbf{x} = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \cdots + \theta_n x_n,
$$

where $\mathbf{x}$ is the feature vector with the first element set to 1, and $\hat{y}$ is the predicted label. We set the first element to 1 to account for the bias term $\theta_0$ in the hypothesis function.

We do this to simplify the notation and allow the bias term $\theta_0$ to be included in the parameter vector $\mathbf{\theta}$. Therefore, the parameter vector $\mathbf{\theta}$ is of size $n+1$. Next, we can represent the hypothesis function in matrix form as:

$$
\hat{\mathbf{y}} = h_{\mathbf{\theta}}(\mathbf{X}) = \mathbf{X}\mathbf{\theta}, \text{ where } \mathbf{X} = \begin{bmatrix}
1 & x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\
1 & x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)}
\end{bmatrix},
$$

where $\hat{\mathbf{y}} = \begin{bmatrix}
\hat{y}^{(1)} \\
\hat{y}^{(2)} \\
\vdots \\
\hat{y}^{(m)}
\end{bmatrix}$ is the predicted label vector.

To perform optimization on the parameter vector $\mathbf{\theta}$, we need to define a loss function that measures the difference between the predicted values and the actual values.

##### Loss Funciton

One common loss function used in linear regression is the **mean squared error (MSE)**, which is defined as:

<blockquote class="equation">

**Mean Squared Error (MSE)**:

$$
\begin{aligned}
\text{MSE}(\mathbf{\theta}) &= \frac{1}{m} \sum_{i=1}^{m} \left( h_{\mathbf{\theta}}(\mathbf{x}^{(i)}) - y^{(i)} \right)^2 \\
&= \frac{1}{m} \left\| h_{\mathbf{\theta}}(\mathbf{X}) - \mathbf{y} \right\|_2^2
\end{aligned}
$$

</blockquote>

where $m$ is the number of observations, $\mathbf{X}$ is the feature matrix, and $\mathbf{y}$ is the target vector. The goal is to minimize the loss function by finding the optimal parameter vector $\mathbf{\theta}$.

##### Algorithms

There are several algorithms to optimize the parameter vector $\mathbf{\theta}$. First, we introduce the closed-form solution using the **normal equation**.

###### Normal Equation

The normal equation is a closed-form solution to the linear regression problem. It is defined as:

<blockquote class="equation">

**Normal Equation**:

$$
\mathbf{\theta} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}
$$

</blockquote>

where $\mathbf{X}^T$ is the transpose of the feature matrix $\mathbf{X}$, and $\mathbf{X}^T \mathbf{X}$ is a square matrix. The normal equation provides an analytical solution to the linear regression problem.

<details><summary>Normal Equation Proof</summary>

To prove the normal equation, we start by defining the loss function as:

$$
\begin{aligned}
\text{MSE}(\mathbf{\theta}) &= \frac{1}{m} \left\| \mathbf{X}\mathbf{\theta} - \mathbf{y} \right\|_2^2 \\
&= \frac{1}{m} (\mathbf{X}\mathbf{\theta} - \mathbf{y})^T (\mathbf{X}\mathbf{\theta} - \mathbf{y}) \\
&= \frac{1}{m} (\mathbf{\theta}^T \mathbf{X}^T - \mathbf{y}^T) (\mathbf{X}\mathbf{\theta} - \mathbf{y}) \\
&= \frac{1}{m} (\mathbf{\theta}^T \mathbf{X}^T \mathbf{X} \mathbf{\theta} - \mathbf{\theta}^T \mathbf{X}^T \mathbf{y} - \mathbf{y}^T \mathbf{X} \mathbf{\theta} + \mathbf{y}^T \mathbf{y}) \\
&= \frac{1}{m} (\mathbf{\theta}^T \mathbf{X}^T \mathbf{X} \mathbf{\theta} - 2\mathbf{\theta}^T \mathbf{X}^T \mathbf{y} + \mathbf{y}^T \mathbf{y})
\end{aligned}
$$

To find the optimal parameter vector $\mathbf{\theta}$, we take the derivative of the loss function with respect to $\mathbf{\theta}$ and set it to zero:

$$
\begin{aligned}
\frac{\partial \text{MSE}(\mathbf{\theta})}{\partial \mathbf{\theta}} &= \frac{2}{m} \mathbf{X}^T \mathbf{X} \mathbf{\theta} - \frac{2}{m} \mathbf{X}^T \mathbf{y} = 0 \\
\mathbf{X}^T \mathbf{X} \mathbf{\theta} &= \mathbf{X}^T \mathbf{y} \\
\mathbf{\theta} &= (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}
\end{aligned}
$$

Therefore, the normal equation provides the optimal parameter vector $\mathbf{\theta}$ that minimizes the loss function.

</details>

Although the normal equation provides an optimal solution to linear regression, it is computationally expensive for large datasets due to the matrix inversion operation. For large datasets, we use iterative optimization algorithms such as **gradient descent**.

###### Gradient Descent

Gradient descent is an iterative optimization algorithm used to minimize the loss function by updating the parameter vector $\mathbf{\theta}$ in the direction of the negative gradient. The update rule for gradient descent is defined as:

<blockquote class="equation">

**Gradient Descent Update Rule**:

$$
\mathbf{\theta}^{(t+1)} = \mathbf{\theta}^{(t)} - \alpha \nabla_{\mathbf{\theta}} L(\mathbf{\theta})
$$

</blockquote>

where $L(\mathbf{\theta})$ is the loss function, and $\alpha$ is the learning rate that controls the step size of the update. In the case of linear regression with the MSE loss function, the gradient is given by:

$$
\nabla_{\mathbf{\theta}} \text{MSE}(\mathbf{\theta}) = \frac{2}{m} \mathbf{X}^T (\mathbf{X}\mathbf{\theta} - \mathbf{y}).
$$

The gradient descent algorithm for linear regression is as follows:

1. Initialize the parameter vector $\mathbf{\theta}$.
2. Compute the predicted values $\hat{\mathbf{y}} = \mathbf{X}\mathbf{\theta}$.
3. Compute the loss function $\text{MSE}(\mathbf{\theta}) = \frac{1}{m} \left\| \hat{\mathbf{y}} - \mathbf{y} \right\|_2^2$.
4. Compute the gradient of the loss function $\nabla_{\mathbf{\theta}} \text{MSE}(\mathbf{\theta}) = \frac{2}{m} \mathbf{X}^T (\hat{\mathbf{y}} - \mathbf{y})$.
5. Update the parameter vector using the gradient descent update rule: $\mathbf{\theta} = \mathbf{\theta} - \alpha \nabla_{\mathbf{\theta}} \text{MSE}(\mathbf{\theta})$.
6. Repeat steps 2-5 until convergence.

<details><summary>Gradient Descent Example</summary>

We can implement the gradient descent algorithm for linear regression in Python. In this example, we also add a termination condition based on the change in the loss function to stop the optimization process when the loss converges. We plot both the computed regression line and the convergence of the loss function.

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
tolerance = 1e-6

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

# Plotting the results
plt.figure(figsize=(12, 6))

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

###### Stochastic Gradient Descent

Stochastic gradient descent (SGD) is a variant of gradient descent that updates the parameter vector using a single training example at a time, instead of the entire dataset. This approach is computationally efficient for large datasets and can escape local minima due to the stochastic nature of the updates.

The update rule for stochastic gradient descent is defined as:

<blockquote class="equation">

**Stochastic Gradient Descent Update Rule**:

$$
\mathbf{\theta}^{(t+1)} = \mathbf{\theta}^{(t)} - \alpha \nabla_{\mathbf{\theta}} L(\mathbf{\theta}^{(t)})
$$

</blockquote>

where $L(\mathbf{\theta}^{(t)})$ is the loss function computed using a single training example at iteration $t$. The gradient is computed with respect to the loss function of the current training example.

In the case of linear regression with the MSE loss function, the gradient for a single training example $(\mathbf{x}^{(i)}, y^{(i)})$ is given by:

$$
\nabla_{\mathbf{\theta}} \text{MSE}(\mathbf{\theta}) = 2 \mathbf{x}^{(i)} (\hat{y}^{(i)} - y^{(i)}),
$$

SGD for linear regression is as follows:

1. Initialize the parameter vector $\mathbf{\theta}$.
2. Shuffle the training data.
3. For each training example $(\mathbf{x}^{(i)}, y^{(i)})$:
   - Compute the predicted value $\hat{y}^{(i)} = \mathbf{\theta}^T \mathbf{x}^{(i)}$.
   - Compute the loss $L^{(i)} = (\hat{y}^{(i)} - y^{(i)})^2$.
   - Compute the gradient $\nabla_{\mathbf{\theta}} L^{(i)} = 2 \mathbf{x}^{(i)} (\hat{y}^{(i)} - y^{(i)})$.
   - Update the parameter vector $\mathbf{\theta} = \mathbf{\theta} - \alpha \nabla_{\mathbf{\theta}} L^{(i)}$.
4. Repeat steps 2-3 for multiple epochs.

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
        gradients = 2 * xi.T.dot(xi.dot(theta) - yi)
        theta = theta - alpha * gradients
        loss = compute_mse(X_b, y, theta)
        loss_values.append(loss)

# Final parameter vector (theta)
print("Theta (parameters):", theta)

# Plotting the results
plt.figure(figsize=(12, 6))

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
