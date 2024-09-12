# **Health Check**

In Kubernetes, a health check is a mechanism to determine whether a container in a Pod is healthy and able to receive requests. Health checks can be performed using liveness probes, readiness probes, and startup probes. These probes call corresponding health check endpoints on the application to automatically monitor and manage the health of a running container within a pod. If a container fails a health check, Kubernetes can restart the container or remove it from the pool of available containers. The probes help Kubernetes ensure that the containers are always running and ready to handle traffic.

Once the application is set up with a CICD pipeline, the probe configurations can be found and configured further in the `/helm` folder for each of the three environments. As the application grows, the probe configurations may need to be adjusted to allow for longer load and startup times. For more information please see the official documentation on [Configuring Liveness, Readiness, and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/).

## **Kubernetes Probe Types**

**Liveness Probe**: is used to check whether the container is still alive and healthy. If the liveness probe fails, the container is considered to be in a failed state, and Kubernetes will restart the container. This probe helps to detect and recover from situations where the container is stuck in an unrecoverable state, such as an application that has stopped responding.

```
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 30
```

**Readiness Probe**: determines whether the container is ready to start accepting traffic. If the readiness probe fails, Kubernetes will stop sending traffic to the container until the probe succeeds again. This probe helps to ensure that the container is fully functional and ready to handle traffic before it is added to a load balancer. 

```
readinessProbe:
  httpGet:
    path: /readiness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 30
```

**Startup Probe**: runs only once when the container starts up and is used to check whether the container has started and is ready to serve requests. It is useful for applications that require a long time to start up, as it can help to ensure that the container is fully ready before it is added to a load balancer or before other containers start depending on it.

For small applications with a short startup time, the `initialDelaySeconds` configuration on the `readinessProbe` may be used instead.

```
startupProbe:
  httpGet:
    path: /startup
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
```
